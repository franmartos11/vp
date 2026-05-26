import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log("Sending email...");
  const result = await resend.emails.send({
    from: "Contact Form <info@dhengconsulting.com>",
    to: [process.env.CONTACT_EMAIL || "info@dhengconsulting.com"],
    subject: "Test email",
    html: "<p>Test</p>"
  });
  console.log("Result:", result);
}

test();
