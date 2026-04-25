import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navigation");
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <footer className="bg-charcoal-900 text-cream-200 mt-auto" role="contentinfo">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid-swiss">
          {/* Brand col */}
          <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
            <Link
              href="/"
              className="inline-block mb-8 transition-opacity hover:opacity-80"
              aria-label="DH Engineering & Consulting LLC — Home"
            >
              <Image
                src="/Logo.png"
                alt="DH Engineering & Consulting LLC"
                width={400}
                height={120}
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert scale-[2.5] md:scale-[3] origin-left"
                priority
              />
            </Link>
            <p className="text-warm-300 text-sm leading-relaxed max-w-xs">
              Comprehensive structural and MEP engineering services from Florida.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-warm-500 hover:text-brand-blue transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-warm-500 hover:text-brand-blue transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="eyebrow text-warm-400 mb-4">Navigation</p>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="eyebrow text-warm-400 mb-4">Contact</p>
            <address className="not-italic text-warm-300 text-sm space-y-2">
              <p>13951 SW 122th Ave, #206</p>
              <p>Miami, FL 33186</p>
              <a
                href="tel:+13526593636"
                className="block hover:text-cream-100 transition-colors"
              >
                +1 (352) 659-3636
              </a>
              <a
                href="mailto:info@dhengconsulting.com"
                className="block hover:text-cream-100 transition-colors"
              >
                info@dhengconsulting.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-blue/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <p className="text-warm-400 text-xs">
              &copy; {year} DH Engineering & Consulting LLC. All rights reserved.
            </p>
            {/* Hidden quick access to CMS */}
            <Link href="/admin" aria-label="Admin Panel Login" className="w-1.5 h-1.5 rounded-full bg-charcoal-800 hover:bg-warm-500 transition-colors" />
          </div>
          <p className="text-warm-400 text-xs">
            Licensed Engineering Firm · State of Florida
          </p>
        </div>
      </div>
    </footer>
  );
}
