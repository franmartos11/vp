import { db } from "@/lib/db";
import Link from "next/link";
import { Folders, Hammer, Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const [projectCount, serviceCount] = await Promise.all([
    db.project.count(),
    db.service.count(),
  ]);

  return (
    <div className="mx-auto max-w-6xl w-full">
      <header className="mb-12 border-b border-warm-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display text-charcoal-900 mb-2">Panel de Control</h1>
          <p className="text-warm-500 font-mono text-sm tracking-widest uppercase">Bienvenido al espacio de trabajo</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        
        {/* Projects Stat */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200 hover:border-warm-500 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warm-500/10 rounded-bl-full group-hover:scale-110 transition-transform" />
          
          <div className="flex items-center gap-4 text-warm-500 mb-6">
            <Folders size={24} />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium">Proyectos Activos</span>
          </div>
          
          <div className="flex items-end justify-between">
            <p className="text-6xl font-display text-charcoal-900">{projectCount}</p>
            <Link 
              href="/admin/projects" 
              className="text-sm font-mono tracking-widest uppercase border-b border-charcoal-900 pb-1 hover:text-warm-500 hover:border-warm-500 transition-colors z-10"
            >
              Gestionar →
            </Link>
          </div>
        </div>

        {/* Services Stat */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200 hover:border-warm-500 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warm-500/10 rounded-bl-full group-hover:scale-110 transition-transform" />
          
          <div className="flex items-center gap-4 text-warm-500 mb-6">
            <Hammer size={24} />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium">Servicios Ofertados</span>
          </div>
          
          <div className="flex items-end justify-between">
            <p className="text-6xl font-display text-charcoal-900">{serviceCount}</p>
            <Link 
              href="/admin/services" 
              className="text-sm font-mono tracking-widest uppercase border-b border-charcoal-900 pb-1 hover:text-warm-500 hover:border-warm-500 transition-colors z-10"
            >
              Gestionar →
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <section>
         <h2 className="text-sm font-mono uppercase tracking-widest text-warm-500 mb-6 flex items-center gap-3">
           <div className="w-6 h-px bg-warm-400" /> Acciones Rápidas
         </h2>
         <div className="flex flex-wrap gap-4">
           <Link 
             href="/admin/projects/new" 
             className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-100 px-6 py-4 rounded-md font-mono text-xs uppercase tracking-widest hover:bg-warm-500 hover:text-charcoal-900 transition-colors"
           >
             <Plus size={16} /> Agregar Proyecto
           </Link>
           <Link 
             href="/admin/services/new" 
             className="inline-flex items-center gap-2 bg-charcoal-800 text-cream-100 px-6 py-4 rounded-md font-mono text-xs uppercase tracking-widest hover:bg-warm-500 hover:text-charcoal-900 transition-colors"
           >
             <Plus size={16} /> Crear Servicio
           </Link>
         </div>
      </section>

    </div>
  );
}
