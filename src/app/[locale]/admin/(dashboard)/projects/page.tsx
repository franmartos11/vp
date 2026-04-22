import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { getLocale } from "next-intl/server";

// Deshabilita el caching estático en el panel
export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const locale = await getLocale();
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl w-full">
      <header className="mb-12 border-b border-warm-200 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display text-charcoal-900 mb-2">Proyectos</h1>
          <p className="text-warm-500 font-mono text-sm tracking-widest uppercase">
            {projects.length} registros en la base de datos
          </p>
        </div>
        <Link 
          href={`/${locale}/admin/projects/new`} 
          className="inline-flex items-center justify-center gap-2 bg-charcoal-900 text-cream-100 px-8 py-4 rounded-md font-mono text-xs uppercase tracking-widest hover:bg-warm-500 hover:text-charcoal-900 transition-colors"
        >
          <Plus size={16} /> Nuevo Proyecto
        </Link>
      </header>

      {projects.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-warm-200 border-dashed">
          <p className="text-warm-500 font-mono uppercase tracking-widest text-sm mb-4">No hay proyectos todavía</p>
          <Link href={`/${locale}/admin/projects/new`} className="text-charcoal-900 underline underline-offset-4 hover:text-warm-500 transition-colors">
            Crea tu primer proyecto aquí
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-warm-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-50/50 border-b border-warm-200">
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Portada</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Título / Tipo</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Año / Lugar</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Estado</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 text-right px-6 py-5 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-warm-50/30 transition-colors group">
                  <td className="px-6 py-4 w-32">
                    <div className="relative w-20 h-14 bg-warm-200 rounded-sm overflow-hidden border border-warm-300">
                      {project.coverImage ? (
                         <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-[10px] uppercase font-mono text-warm-400">Sin Foto</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                     <p className="font-display text-charcoal-900 text-lg">{project.title}</p>
                     <span className="inline-block mt-1 font-mono text-[10px] tracking-widest uppercase bg-warm-200 text-charcoal-700 px-2 py-0.5 rounded-sm">
                        {project.projectType}
                     </span>
                  </td>
                  
                  <td className="px-6 py-4 font-light text-charcoal-700">
                    <p>{project.location || "N/A"}</p>
                    <p className="text-sm text-warm-500 mt-1">{project.completionYear || "-"}</p>
                  </td>

                  <td className="px-6 py-4">
                     {project.featured ? (
                       <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Destacado
                       </span>
                     ) : (
                       <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-warm-600 bg-warm-100 px-2.5 py-1 rounded-full border border-warm-200">
                         <div className="w-1.5 h-1.5 rounded-full bg-warm-400" /> Estándar
                       </span>
                     )}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                     <Link 
                       href={`/${locale}/portfolio/${project.slug}`} 
                       target="_blank"
                       className="inline-flex p-2 text-warm-500 hover:text-charcoal-900 hover:bg-warm-100 rounded-md transition-all"
                       title="Ver en la web"
                     >
                       <Eye size={18} />
                     </Link>
                     <Link 
                       href={`/${locale}/admin/projects/${project.id}`} 
                       className="inline-flex p-2 text-warm-500 hover:text-charcoal-900 hover:bg-warm-100 rounded-md transition-all"
                       title="Editar"
                     >
                       <Edit2 size={18} />
                     </Link>
                     <button 
                       className="inline-flex p-2 text-warm-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                       title="Eliminar"
                     >
                       <Trash2 size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
