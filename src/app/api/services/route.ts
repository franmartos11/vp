import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const service = await db.service.create({
      data: {
        title: data.title,
        titleEs: data.titleEs,
        slug,
        shortDescription: data.shortDescription,
        shortDescriptionEs: data.shortDescriptionEs,
        fullDescription: data.fullDescription,
        fullDescriptionEs: data.fullDescriptionEs,
        coverImage: data.coverImage,
        keyDeliverables: data.keyDeliverables ? JSON.stringify(data.keyDeliverables) : null,
        keyDeliverablesEs: data.keyDeliverablesEs ? JSON.stringify(data.keyDeliverablesEs) : null,
        gallery: data.gallery ? JSON.stringify(data.gallery) : null,
        order: data.order || 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
