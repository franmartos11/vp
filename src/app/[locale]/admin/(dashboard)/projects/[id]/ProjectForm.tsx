"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Image as ImageIcon, Plus, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ENGINEERING_SERVICES = [
  { key: "structural-engineering", label: "Structural Engineering" },
  { key: "mep-engineering", label: "MEP Engineering" },
  { key: "building-recertifications", label: "Building Recertifications" },
  { key: "structural-inspections", label: "Structural Inspections" },
  { key: "shop-drawings", label: "Shop Drawings" },
  { key: "permitting", label: "Permitting & Compliance" },
  { key: "as-built", label: "As-Built Evaluations" },
] as const;

interface ProjectFormProps {
  initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    titleEs: initialData?.titleEs || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    descriptionEs: initialData?.descriptionEs || "",
    projectType: initialData?.projectType || "residential",
    projectTypeEs: initialData?.projectTypeEs || "residencial",
    completionYear: initialData?.completionYear || "",
    location: initialData?.location || "",
    locationEs: initialData?.locationEs || "",
    featured: initialData?.featured || false,
    coverImage: initialData?.coverImage || "",
    videoUrl: initialData?.videoUrl || "",
    technicalSheet: initialData?.technicalSheet || "",
    technicalSheetEs: initialData?.technicalSheetEs || "",
    materials: initialData?.materials || [],
    materialsEs: initialData?.materialsEs || [],
    testimonial: initialData?.testimonial || { quote: "", author: "" },
    testimonialEs: initialData?.testimonialEs || { quote: "", author: "" },
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

  const toggleScope = (key: string) => {
    const current: string[] = Array.isArray(formData.materials) ? formData.materials : [];
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setFormData({ ...formData, materials: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = initialData ? `/api/projects/${initialData.id}` : "/api/projects";
    const method = initialData ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push("/admin/projects");
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
              1. Información Principal
           </h2>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Título (EN)</label>
               <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-lg font-display" placeholder="Nombre completo del proyecto" />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Título (ES)</label>
               <input type="text" required value={formData.titleEs} onChange={(e) => setFormData({...formData, titleEs: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-lg font-display" placeholder="Nombre en español" />
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Tipo (Slug)</label>
               <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="se-auto-genera" />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Categoría</label>
               <div className="flex gap-2">
                 <select value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 bg-transparent text-sm font-mono">
                   <option value="residential">Residential</option>
                   <option value="commercial">Commercial</option>
                   <option value="renovation">Renovation</option>
                   <option value="interior">Interior</option>
                 </select>
                 <select value={formData.projectTypeEs} onChange={(e) => setFormData({...formData, projectTypeEs: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 bg-transparent text-sm font-mono">
                   <option value="residencial">Residencial</option>
                   <option value="comercial">Comercial</option>
                   <option value="renovacion">Renovación</option>
                   <option value="interior">Interior</option>
                 </select>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Año de Entrega</label>
               <input type="number" value={formData.completionYear} onChange={(e) => setFormData({...formData, completionYear: parseInt(e.target.value)})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="2026" />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">Locación (EN / ES)</label>
               <div className="flex gap-2">
                 <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="Miami, FL" />
                 <input type="text" value={formData.locationEs} onChange={(e) => setFormData({...formData, locationEs: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="Miami, FL" />
               </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Narrativa (EN)</label>
               <textarea rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm text-charcoal-700 rounded-sm" placeholder="Describe the engineering challenge, scope, and outcome..." />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block">Descripción Narrativa (ES)</label>
               <textarea rows={6} value={formData.descriptionEs} onChange={(e) => setFormData({...formData, descriptionEs: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm text-charcoal-700 rounded-sm" placeholder="Describe el desafío de ingeniería, alcance y resultado..." />
             </div>
           </div>

           <label className="flex items-center gap-3 cursor-pointer p-4 border border-warm-200 rounded-md hover:bg-warm-50 transition-colors">
             <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 accent-warm-500" />
             <span className="text-sm font-mono uppercase tracking-widest text-charcoal-700">Mostrar en el inicio (Featured)</span>
           </label>
        </div>

        {/* Right Col - Media & Technical */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
             <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4 flex justify-between items-center">
                2. Portada Principal
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
               {formData.coverImage && (
                  <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-white font-mono text-xs tracking-widest uppercase bg-charcoal-900/80 px-4 py-2 border border-white/20">Cambiar Foto</span>
                  </div>
               )}
               <input type="file" onChange={(e) => uploadImage(e, 'cover')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
             </div>
             
             <div className="mt-6 space-y-2">
               <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700">O Pega una URL de YouTube (Embed)</label>
               <input type="url" value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="https://youtube.com/watch?v=..." />
             </div>
           </div>

           <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
             <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4">
                3. Project Data (Technical Sheet)
             </h2>
             <div className="grid grid-cols-2 gap-4">
               <textarea rows={6} value={formData.technicalSheet} onChange={(e) => setFormData({...formData, technicalSheet: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-mono bg-warm-50 rounded-sm leading-relaxed" placeholder={"Structural System: Reinforced concrete\nArea: 6,500 sq ft\nStories: 3\nCode: FBC 2023"} />
               <textarea rows={6} value={formData.technicalSheetEs} onChange={(e) => setFormData({...formData, technicalSheetEs: e.target.value})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-mono bg-warm-50 rounded-sm leading-relaxed" placeholder={"Sistema Estructural: Concreto reforzado\nÁrea: 6,500 sq ft\nPisos: 3\nCódigo: FBC 2023"} />
             </div>
             <p className="text-[10px] text-warm-400 font-mono tracking-wide mt-2 uppercase">Formato: Etiqueta: Valor (un dato por línea). EN / ES.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Engineering Scope + Testimonial */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
          <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4">
             4. Engineering Scope & Testimonio
          </h2>
          
          {/* Testimonials */}
          <div className="grid grid-cols-2 gap-6 mb-10">
             <div className="space-y-6">
               <div>
                 <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block mb-2">Testimonio Cita (EN)</label>
                 <textarea rows={3} value={formData.testimonial.quote} onChange={(e) => setFormData({...formData, testimonial: {...formData.testimonial, quote: e.target.value}})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-serif italic text-charcoal-700 rounded-sm" placeholder="The execution level was beyond words..." />
               </div>
               <div>
                 <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 mb-2 block">Autor (EN)</label>
                 <input type="text" value={formData.testimonial.author} onChange={(e) => setFormData({...formData, testimonial: {...formData.testimonial, author: e.target.value}})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="John D. — Property Owner" />
               </div>
             </div>
             
             <div className="space-y-6">
               <div>
                 <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block mb-2">Testimonio Cita (ES)</label>
                 <textarea rows={3} value={formData.testimonialEs?.quote || ""} onChange={(e) => setFormData({...formData, testimonialEs: {...(formData.testimonialEs || {quote:"", author:""}), quote: e.target.value}})} className="w-full border border-warm-200 p-4 outline-none focus:border-warm-500 text-sm font-serif italic text-charcoal-700 rounded-sm" placeholder="El nivel de ejecución superó nuestras expectativas..." />
               </div>
               <div>
                 <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 mb-2 block">Autor (ES)</label>
                 <input type="text" value={formData.testimonialEs?.author || ""} onChange={(e) => setFormData({...formData, testimonialEs: {...(formData.testimonialEs || {quote:"", author:""}), author: e.target.value}})} className="w-full border-b border-warm-300 p-2 outline-none focus:border-warm-500 text-sm font-mono" placeholder="Juan D. — Propietario" />
               </div>
             </div>
          </div>

          {/* Engineering Scope checkboxes */}
          <div>
            <label className="text-xs uppercase tracking-widest font-mono text-charcoal-700 block mb-4">
              Engineering Scope — Servicios de Ingeniería Aplicados
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ENGINEERING_SERVICES.map(({ key, label }) => {
                const current: string[] = Array.isArray(formData.materials) ? formData.materials : [];
                const isChecked = current.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-3 cursor-pointer p-3 border rounded-md transition-all duration-200 ${
                      isChecked
                        ? "border-brand-blue bg-brand-blue/5 text-charcoal-900"
                        : "border-warm-200 text-warm-500 hover:border-warm-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleScope(key)}
                      className="w-4 h-4"
                    />
                    <span className="text-xs font-mono">{label}</span>
                  </label>
                );
              })}
            </div>
            <p className="text-[10px] text-warm-400 font-mono mt-4 uppercase tracking-wide">
              Selecciona todos los servicios aplicados en este proyecto.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-warm-200">
          <h2 className="text-sm font-mono tracking-widest uppercase text-warm-500 mb-6 border-b border-warm-100 pb-4 flex justify-between items-center">
             5. Galería Inferior
             <div className="relative overflow-hidden inline-flex px-3 py-1 bg-charcoal-900 text-cream-100 rounded-full cursor-pointer hover:bg-warm-500 hover:text-charcoal-900 transition-colors">
               <span className="text-[10px] uppercase font-mono tracking-widest flex items-center gap-1"><Plus size={10} /> Subir Foto</span>
               <input type="file" onChange={(e) => uploadImage(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
             </div>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {formData.gallery.map((img: any, idx: number) => (
                <div key={idx} className="relative aspect-square bg-warm-100 rounded-lg overflow-hidden group">
                  <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                     <button type="button" onClick={() => {
                        const newGallery = [...formData.gallery];
                        newGallery.splice(idx, 1);
                        setFormData({...formData, gallery: newGallery});
                     }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-80 hover:opacity-100">
                       <Trash2 size={12} />
                     </button>
                     <input type="text" value={img.caption} placeholder="Caption (opcional)" onChange={(e) => {
                        const newGallery = [...formData.gallery];
                        newGallery[idx].caption = e.target.value;
                        setFormData({...formData, gallery: newGallery});
                     }} className="w-full text-[10px] p-1.5 bg-black/50 text-white outline-none font-mono" />
                  </div>
                </div>
             ))}
             {formData.gallery.length === 0 && (
               <div className="col-span-full py-12 text-center text-warm-400 font-mono text-xs uppercase tracking-wide border-2 border-dashed border-warm-200 rounded-lg">
                 Agrega fotos del proyecto terminado.
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 bg-charcoal-900/95 backdrop-blur-md text-white p-4 md:p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl border border-charcoal-700 z-50">
        <Link href="/admin/projects" className="text-xs uppercase font-mono tracking-widest text-warm-300 hover:text-white flex items-center gap-2">
          <ArrowLeft size={14} /> Cancelar y Volver
        </Link>
        <button type="submit" disabled={loading} className="px-10 py-4 bg-warm-500 text-charcoal-900 font-mono tracking-[0.2em] text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50">
          {loading ? "Guardando..." : <><Save size={16} /> Publicar Proyecto</>}
        </button>
      </div>

    </form>
  );
}
