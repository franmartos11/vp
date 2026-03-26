"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Nav() {
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") },
  ] as const;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled || !isHome
            ? "bg-cream-100/95 backdrop-blur-sm border-b border-warm-200"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <nav className="container mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Vertex Build Group — Home"
          >
            <Image
              src="/Logo.png"
              alt="Vertex Build Group"
              width={400}
              height={120}
              className="h-16 md:h-20 w-auto object-contain scale-[2.5] md:scale-[3] origin-left max-w-[140px] md:max-w-none"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname.startsWith(link.href) ? "active text-brand-blue" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-charcoal-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-cream-100 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto flex items-center justify-between h-16">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                <Image
                  src="/Logo.png"
                  alt="Vertex Build Group"
                  width={300}
                  height={100}
                  className="h-16 w-auto object-contain scale-[2.5] origin-left max-w-[140px]"
                  priority
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 container mx-auto flex flex-col justify-center gap-8">
              <div className="flex justify-center mb-4">
                <LanguageSwitcher />
              </div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl md:text-5xl font-display text-charcoal-900 hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className="mt-8 flex justify-center"
              >
                <Link href="/contact" className="btn-primary w-full max-w-sm text-center bg-charcoal-900 text-white hover:bg-brand-blue transition-colors uppercase tracking-widest text-sm font-semibold py-4">
                  {t("start_project")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
