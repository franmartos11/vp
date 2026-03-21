import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Auto-generate slug if not provided logically inside UI
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const project = await db.project.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        projectType: data.projectType || "residential",
        completionYear: data.completionYear ? parseInt(data.completionYear) : null,
        location: data.location,
        featured: data.featured || false,
        coverImage: data.coverImage,
        videoUrl: data.videoUrl,
        technicalSheet: data.technicalSheet, // Raw string
        materials: data.materials ? JSON.stringify(data.materials) : null, // JSON string
        testimonial: data.testimonial ? JSON.stringify(data.testimonial) : null, // JSON string
        gallery: data.gallery ? JSON.stringify(data.gallery) : null, // JSON string
        order: data.order || 0,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
