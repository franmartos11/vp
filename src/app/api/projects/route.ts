import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data: any = await req.json();
    
    // Auto-generate slug if not provided logically inside UI
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const project = await db.project.create({
      data: {
        title: data.title,
        titleEs: data.titleEs,
        slug,
        description: data.description,
        descriptionEs: data.descriptionEs,
        projectType: data.projectType || "residential",
        projectTypeEs: data.projectTypeEs || "residencial",
        completionYear: data.completionYear ? parseInt(data.completionYear) : null,
        location: data.location,
        locationEs: data.locationEs,
        featured: data.featured || false,
        coverImage: data.coverImage,
        videoUrl: data.videoUrl,
        technicalSheet: data.technicalSheet, // Raw string
        technicalSheetEs: data.technicalSheetEs,
        materials: data.materials ? JSON.stringify(data.materials) : null, // JSON string
        materialsEs: data.materialsEs ? JSON.stringify(data.materialsEs) : null,
        testimonial: data.testimonial ? JSON.stringify(data.testimonial) : null, // JSON string
        testimonialEs: data.testimonialEs ? JSON.stringify(data.testimonialEs) : null,
        gallery: data.gallery ? JSON.stringify(data.gallery) : null, // JSON string
        order: data.order || 0,
      } as any,
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
