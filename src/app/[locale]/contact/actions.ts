"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your project"),
});

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    projectType: formData.get("projectType") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      errors[key] = issue.message;
    }
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const { name, email, phone, projectType, message } = result.data;

  try {
    await resend.emails.send({
      from: "Contact Form <contact@vertexbuildgroup.com>",
      to: [process.env.CONTACT_EMAIL || "hello@vertexbuildgroup.com"],
      replyTo: email,
      subject: `New inquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ""}
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return {
      success: true,
      message:
        "Thank you for your message. We'll be in touch within 24 hours.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
