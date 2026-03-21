"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh(); // Clear client state
  };

  if (mobile) {
     return (
       <button onClick={handleLogout} className="text-warm-300 hover:text-white transition-colors" aria-label="Cerrar sesión">
         <LogOut size={20} />
       </button>
     );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full text-left rounded-md hover:text-red-400 transition-colors py-2 uppercase tracking-widest"
    >
      <LogOut size={14} />
      Cerrar Sesión
    </button>
  );
}
