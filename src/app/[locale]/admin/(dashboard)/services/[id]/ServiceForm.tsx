"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Image as ImageIcon, Plus, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceFormProps {
  initialData?: any;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    titleEs: initialData?.titleEs || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    shortDescriptionEs: initialData?.shortDescriptionEs || "",
    fullDescription: initialData?.fullDescription || "",
    fullDescriptionEs: initialData?.fullDescriptionEs || "",
    coverImage: initialData?.coverImage || "",
    keyDeliverables: initialData?.keyDeliverables || [],
    keyDeliverablesEs: initialData?.keyDeliverablesEs || [],
    gallery: initialData?.gallery || [],
  });

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: data });
    const { url } = await res.json();

    if (type === 'cover') {
      setFormData({ ...formData, coverImage: url });
    } else {
      setFormData({ ...formData, gallery: [...formData.gallery, { url, alt: "", caption: "" }] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = initialData ? `/api/services/${initialData.id}` : "/api/services";
    const method = initialData ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/admin/services");
      router.refresh();
    } else {
      alert("Error al guardar");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col - Core Data */}
        <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-xl shadow-sm border border-warm-200">
           <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4">
              1. Identidad del Servicio
           </h2>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Título (EN)</label>
               <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-lg font-display" placeholder="Ex: Custom Architecture" />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Título (ES)</label>
               <input type="text" value={formData.titleEs} onChange={(e) => setFormData({...formData, titleEs: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-lg font-display" placeholder="Ej: Arquitectura Personalizada" />
             </div>
           </div>

           <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Identificador URL (Slug)</label>
             <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="custom-architecture" />
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Corta (EN)</label>
               <textarea rows={3} value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-light text-charcoal-700 rounded-sm" placeholder="Service summary in 2 lines..." />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Corta (ES)</label>
               <textarea rows={3} value={formData.shortDescriptionEs} onChange={(e) => setFormData({...formData, shortDescriptionEs: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-light text-charcoal-700 rounded-sm" placeholder="Resumen del servicio en 2 líneas..." />
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Completa (EN)</label>
               <textarea rows={8} value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm text-charcoal-700 rounded-sm leading-relaxed" placeholder="Everything the client needs to know..." />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Completa (ES)</label>
               <textarea rows={8} value={formData.fullDescriptionEs} onChange={(e) => setFormData({...formData, fullDescriptionEs: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm text-charcoal-700 rounded-sm leading-relaxed" placeholder="Todo lo que el cliente debe saber sobre tu proceso..." />
             </div>
           </div>
        </div>

        {/* Right Col - Media */}
        <div className="space-y-8">
           
           <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
             <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4 flex justify-between items-center">
                2. Portada del Servicio
             </h2>
             <div className="relative aspect-[4/3] w-full bg-warm-100 border-2 border-dashed border-warm-300 rounded-lg overflow-hidden flex items-center justify-center hover:bg-warm-200 transition-colors group cursor-pointer">
               {formData.coverImage ? (
                  <Image src={formData.coverImage} alt="Portada" fill className="object-cover" />
               ) : (
                  <div className="text-center text-warm-500 flex flex-col items-center">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Click para Upload</span>
                  </div>
               )}
               {/* Hover Overlay */}
               {formData.coverImage && (
                  <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-white font-mono text-xs tracking-widest uppercase bg-charcoal-900/80 px-4 py-2 border border-white/20">Cambiar Foto</span>
                  </div>
               )}
               <input type="file" onChange={(e) => uploadImage(e, 'cover')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
             </div>
           </div>

           <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
             <div className="flex justify-between items-center mb-6 border-b border-warm-100 pb-4">
               <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500">
                  3. Entregables Clave (EN)
               </h2>
               <button type="button" onClick={() => setFormData({...formData, keyDeliverables: [...formData.keyDeliverables, ""]})} className="text-[10px] uppercase tracking-widest font-mono text-warm-500 hover:text-charcoal-900 border border-warm-300 px-2 py-1 flex items-center gap-1 transition-colors">
                  <Plus size={10} /> Añadir
               </button>
             </div>
             <div className="space-y-3">
               {formData.keyDeliverables.map((item: string, idx: number) => (
                 <div key={idx} className="flex gap-2 items-center">
                   <div className="w-1.5 h-1.5 bg-warm-400 rounded-full shrink-0" />
                   <input type="text" value={item} onChange={(e) => {
                     const newList = [...formData.keyDeliverables];
                     newList[idx] = e.target.value;
                     setFormData({...formData, keyDeliverables: newList});
                   }} className="flex-1 border-b border-warm-200 p-2 outline-none focus:border-warm-500 text-sm font-mono bg-warm-50" placeholder="Ex: Site Analysis & Zoning" />
                   <button type="button" onClick={() => {
                     const newList = [...formData.keyDeliverables];
                     newList.splice(idx, 1);
                     setFormData({...formData, keyDeliverables: newList});
                   }} className="p-2 text-warm-300 hover:text-red-500 transition-colors">
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
               {formData.keyDeliverables.length === 0 && <p className="text-xs text-warm-400 italic font-mono uppercase text-center py-4">Sin entregables añadidos.</p>}
             </div>
           </div>

           <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
             <div className="flex justify-between items-center mb-6 border-b border-warm-100 pb-4">
               <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500">
                  Entregables Clave (ES)
               </h2>
               <button type="button" onClick={() => setFormData({...formData, keyDeliverablesEs: [...formData.keyDeliverablesEs, ""]})} className="text-[10px] uppercase tracking-widest font-mono text-warm-500 hover:text-charcoal-900 border border-warm-300 px-2 py-1 flex items-center gap-1 transition-colors">
                  <Plus size={10} /> Añadir
               </button>
             </div>
             <div className="space-y-3">
               {formData.keyDeliverablesEs.map((item: string, idx: number) => (
                 <div key={idx} className="flex gap-2 items-center">
                   <div className="w-1.5 h-1.5 bg-warm-400 rounded-full shrink-0" />
                   <input type="text" value={item} onChange={(e) => {
                     const newList = [...formData.keyDeliverablesEs];
                     newList[idx] = e.target.value;
                     setFormData({...formData, keyDeliverablesEs: newList});
                   }} className="flex-1 border-b border-warm-200 p-2 outline-none focus:border-warm-500 text-sm font-mono bg-warm-50" placeholder="Ej: Análisis del Sitio" />
                   <button type="button" onClick={() => {
                     const newList = [...formData.keyDeliverablesEs];
                     newList.splice(idx, 1);
                     setFormData({...formData, keyDeliverablesEs: newList});
                   }} className="p-2 text-warm-300 hover:text-red-500 transition-colors">
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
               {formData.keyDeliverablesEs.length === 0 && <p className="text-xs text-warm-400 italic font-mono uppercase text-center py-4">Sin entregables añadidos.</p>}
             </div>
           </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
        <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4 flex justify-between items-center">
           4. Galería del Servicio
           <div className="relative overflow-hidden inline-flex px-3 py-1 bg-charcoal-900 text-cream-100 rounded-full cursor-pointer hover:bg-warm-500 hover:text-charcoal-900 transition-colors">
             <span className="text-[10px] uppercase font-mono tracking-widest flex items-center gap-1"><Plus size={10} /> Añadir Foto</span>
             <input type="file" onChange={(e) => uploadImage(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
           </div>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
           {formData.gallery.map((img: any, idx: number) => (
              <div key={idx} className="relative aspect-square bg-warm-100 rounded-lg overflow-hidden group border border-warm-200 shadow-sm">
                <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                   <button type="button" onClick={() => {
                      const newGallery = [...formData.gallery];
                      newGallery.splice(idx, 1);
                      setFormData({...formData, gallery: newGallery});
                   }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-80 hover:opacity-100">
                     <Trash2 size={12} />
                   </button>
                </div>
              </div>
           ))}
           {formData.gallery.length === 0 && (
             <div className="col-span-full py-12 text-center text-warm-400 font-mono text-xs uppercase tracking-wide border-2 border-dashed border-warm-200 rounded-lg">
               La galería está vacía.
             </div>
           )}
        </div>
      </div>

      {/* Sticky Save Footer */}
      <div className="sticky bottom-6 bg-charcoal-900/95 backdrop-blur-md text-white p-4 md:p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl border border-charcoal-700 z-50">
        <Link href="/admin/services" className="text-xs uppercase font-mono tracking-widest text-warm-300 hover:text-white flex items-center gap-2">
          <ArrowLeft size={14} /> Descartar y Volver
        </Link>
        <button type="submit" disabled={loading} className="px-10 py-4 bg-warm-500 text-charcoal-900 font-mono tracking-[0.2em] text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50">
          {loading ? "Guardando..." : <><Save size={16} /> Publicar Servicio</>}
        </button>
      </div>

    </form>
  );
}
