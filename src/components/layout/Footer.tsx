import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-200 mt-auto" role="contentinfo">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid-swiss">
          {/* Brand col */}
          <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
            <Link
              href="/"
              className="inline-block mb-8 transition-opacity hover:opacity-80"
              aria-label="Vertex Build Group — Home"
            >
              <Image
                src="/Logo.png"
                alt="Vertex Build Group"
                width={400}
                height={120}
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert scale-[2.5] md:scale-[3] origin-left"
                priority
              />
            </Link>
            <p className="text-warm-500 text-sm leading-relaxed max-w-xs">
              Crafting exceptional architecture and construction across the United States.
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
                className="text-warm-500 hover:text-cream-100 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="eyebrow text-warm-500 mb-4">Navigation</p>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-400 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="col-span-6 md:col-span-4 md:col-start-9">
            <p className="eyebrow text-warm-500 mb-4">Contact</p>
            <address className="not-italic text-warm-400 text-sm space-y-2">
              <p>100 Brickell Ave, Suite 1200</p>
              <p>Miami, FL 33131</p>
              <a
                href="tel:+13050000000"
                className="block hover:text-cream-100 transition-colors"
              >
                +1 (305) 000-0000
              </a>
              <a
                href="mailto:hello@vertexbuildgroup.com"
                className="block hover:text-cream-100 transition-colors"
              >
                hello@vertexbuildgroup.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-600 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-warm-500 text-xs">
              &copy; {year} Vertex Build Group. All rights reserved.
            </p>
            {/* Hidden quick access to CMS */}
            <Link href="/admin" aria-label="Admin Panel Login" className="w-1.5 h-1.5 rounded-full bg-charcoal-800 hover:bg-warm-500 transition-colors" />
          </div>
          <p className="text-warm-500 text-xs">
            Licensed General Contractor · State of Florida
          </p>
        </div>
      </div>
    </footer>
  );
}
