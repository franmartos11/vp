import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const service = await db.service.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        coverImage: data.coverImageUrl,
        keyDeliverables: data.keyDeliverables ? JSON.stringify(data.keyDeliverables) : null,
        gallery: data.gallery ? JSON.stringify(data.gallery) : null,
        order: data.order || 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
