"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Clave incorrecta.");
      }
    } catch (err) {
      setError("Error de conexión al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal-900 flex flex-col items-center justify-center p-6 text-cream-100">
      <AnimatedSection className="w-full max-w-sm">
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-charcoal-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-charcoal-700">
            <Lock size={18} className="text-warm-500" />
          </div>
          <h1 className="text-2xl font-display tracking-widest uppercase mb-2">Vertex Panel</h1>
          <p className="font-mono text-xs tracking-[0.2em] text-warm-500 uppercase">
            Acceso Restringido
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full bg-charcoal-800 border-b-2 border-charcoal-700 focus:border-warm-500 px-4 py-4 text-center text-xl tracking-widest outline-none transition-colors disabled:opacity-50 placeholder-charcoal-600"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-mono uppercase tracking-widest animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full relative py-4 px-6 bg-warm-500 text-charcoal-900 uppercase font-mono text-xs tracking-[0.2em] hover:bg-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-warm-500 group overflow-hidden flex items-center justify-center gap-2"
          >
            {loading ? "Verificando..." : "Ingresar"}
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

      </AnimatedSection>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-charcoal-900 via-warm-500 to-charcoal-900 opacity-20" />
    </main>
  );
}
