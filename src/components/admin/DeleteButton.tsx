"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  confirmMessage?: string;
}

export default function DeleteButton({ 
  id, 
  endpoint, 
  confirmMessage = "¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer." 
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(`Error al eliminar: ${data.error || "Error desconocido"}`);
      }
    } catch (error) {
      alert("Error de red al intentar eliminar.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex p-2 rounded-md transition-all ${
        isDeleting 
          ? "text-warm-300 cursor-not-allowed" 
          : "text-warm-400 hover:text-red-600 hover:bg-red-50"
      }`}
      title="Eliminar"
    >
      <Trash2 size={18} className={isDeleting ? "animate-pulse" : ""} />
    </button>
  );
}
