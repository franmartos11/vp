import Link from "next/link";
import { LogOut, LayoutDashboard, Folders, Hammer, Settings } from "lucide-react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Redundante con el middleware, pero aporta doble seguridad
  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Folders },
    { name: "Services", href: "/admin/services", icon: Hammer },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-warm-50 flex text-charcoal-900 font-sans">
      
      {/* Sidebar Nav */}
      <aside className="w-64 bg-charcoal-900 text-cream-100 flex flex-col hidden md:flex shrink-0">
        <div className="p-8 border-b border-charcoal-800">
          <Link href="/admin" className="font-display text-xl tracking-widest uppercase flex items-center gap-3">
             <div className="w-3 h-3 bg-warm-500 rounded-sm" /> Vertex
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-warm-500 mt-2 block font-mono">Control Panel</span>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-md text-sm text-warm-300 hover:text-white hover:bg-charcoal-800 transition-colors font-mono tracking-wide"
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-charcoal-800 text-xs text-warm-500 font-mono flex flex-col gap-4">
          <Link href="/" target="_blank" className="hover:text-white transition-colors">
            ↗ Visitar Sitio Web
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Minimal) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-charcoal-900 text-cream-100 border-b border-charcoal-800">
          <Link href="/admin" className="font-display text-lg tracking-widest uppercase">
            Vertex
          </Link>
          <LogoutButton mobile />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-warm-50 p-6 lg:p-12">
          {children}
        </div>
      </main>

    </div>
  );
}
