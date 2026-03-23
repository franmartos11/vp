import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl w-full">
      <header className="mb-12 border-b border-warm-200 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display text-charcoal-900 mb-2">Servicios</h1>
          <p className="text-warm-500 font-mono text-sm tracking-widest uppercase">
            {services.length} ramas de servicio activas
          </p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="inline-flex items-center justify-center gap-2 bg-charcoal-900 text-cream-100 px-8 py-4 rounded-md font-mono text-xs uppercase tracking-widest hover:bg-warm-500 hover:text-charcoal-900 transition-colors"
        >
          <Plus size={16} /> Nuevo Servicio
        </Link>
      </header>

      {services.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-warm-200 border-dashed">
          <p className="text-warm-500 font-mono uppercase tracking-widest text-sm mb-4">No has dado de alta ningún servicio</p>
          <Link href="/admin/services/new" className="text-charcoal-900 underline underline-offset-4 hover:text-warm-500 transition-colors">
            Crea tu primer servicio aquí
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-warm-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-50/50 border-b border-warm-200">
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Portada</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 px-6 py-5 font-normal">Título / Descripción Pinta</th>
                <th className="font-mono text-xs uppercase tracking-widest text-warm-500 text-right px-6 py-5 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-warm-50/30 transition-colors group">
                  <td className="px-6 py-4 w-32">
                    <div className="relative w-20 h-14 bg-warm-200 rounded-sm overflow-hidden border border-warm-300">
                      {service.coverImage ? (
                         <Image src={service.coverImage} alt={service.title} fill className="object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-[10px] uppercase font-mono text-warm-400">Sin Foto</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                     <p className="font-display text-charcoal-900 text-lg">{service.title}</p>
                     <p className="text-sm font-light text-warm-600 mt-1 line-clamp-1 max-w-lg">
                        {service.shortDescription}
                     </p>
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                     <Link 
                       href={`/services/${service.slug}`} 
                       target="_blank"
                       className="inline-flex p-2 text-warm-500 hover:text-charcoal-900 hover:bg-warm-100 rounded-md transition-all"
                       title="Ver en la web"
                     >
                       <Eye size={18} />
                     </Link>
                     <Link 
                       href={`/admin/services/${service.id}`} 
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
