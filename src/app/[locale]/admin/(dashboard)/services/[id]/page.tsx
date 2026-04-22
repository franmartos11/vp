import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ServiceForm from "./ServiceForm";

export default async function EditServicePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let service = null;

  if (id !== "new") {
    service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      notFound();
    }
  }

  const parsedService = service ? {
    ...service,
    keyDeliverables: service.keyDeliverables ? JSON.parse(service.keyDeliverables) : [],
    keyDeliverablesEs: (service as any).keyDeliverablesEs ? JSON.parse((service as any).keyDeliverablesEs) : [],
    gallery: service.gallery ? JSON.parse(service.gallery) : [],
  } : null;

  return (
    <div className="mx-auto max-w-5xl w-full">
      <header className="mb-8 border-b border-warm-200 pb-8">
        <h1 className="text-3xl font-display text-charcoal-900 mb-2">
          {id === "new" ? "Nuevo Servicio" : `Editar Servicio`}
        </h1>
        <p className="text-warm-500 font-mono text-sm tracking-widest uppercase">
          {id === "new" ? "Define un nuevo proceso" : parsedService?.title}
        </p>
      </header>

      <ServiceForm initialData={parsedService} />
    </div>
  );
}
