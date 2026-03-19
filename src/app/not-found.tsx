import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-lg">
            <span className="eyebrow text-warm-400 block mb-4">404</span>
            <h1 className="text-display-xl font-display text-charcoal-900 mb-4">
              Page not found.
            </h1>
            <p className="text-warm-500 text-sm leading-relaxed mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/" className="btn-primary">
              Return home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
