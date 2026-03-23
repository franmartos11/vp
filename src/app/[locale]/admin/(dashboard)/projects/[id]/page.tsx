import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectForm from "./ProjectForm";

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let project = null;

  if (id !== "new") {
    project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      notFound();
    }
  }

  // Parse JSON objects before passing to client form
  const parsedProject = project ? {
    ...project,
    materials: project.materials ? JSON.parse(project.materials) : [],
    materialsEs: (project as any).materialsEs ? JSON.parse((project as any).materialsEs) : [],
    testimonial: project.testimonial ? JSON.parse(project.testimonial) : { quote: "", author: "" },
    testimonialEs: (project as any).testimonialEs ? JSON.parse((project as any).testimonialEs) : { quote: "", author: "" },
    gallery: project.gallery ? JSON.parse(project.gallery) : [],
  } : null;

  return (
    <div className="mx-auto max-w-5xl w-full">
      <header className="mb-8 border-b border-warm-200 pb-8">
        <h1 className="text-3xl font-display text-charcoal-900 mb-2">
          {id === "new" ? "Nuevo Proyecto" : `Editar Proyecto`}
        </h1>
        <p className="text-warm-500 font-mono text-sm tracking-widest uppercase">
          {id === "new" ? "Ingresa la información básica" : parsedProject?.title}
        </p>
      </header>

      <ProjectForm initialData={parsedProject} />
    </div>
  );
}
