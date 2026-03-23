import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const oswald = localFont({
  src: "../../../public/Oswald-SemiBold.ttf",
  variable: "--font-oswald",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vertex Build Group | Luxury Architecture & Construction",
    template: "%s | Vertex Build Group",
  },
  description:
    "Award-winning luxury architecture and construction firm based in the United States. Residential, commercial, and interior design projects crafted with precision.",
  keywords: [
    "luxury architect",
    "luxury construction",
    "custom home builder",
    "residential architect",
    "commercial construction",
    "interior design",
    "architecture firm",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vertex Build Group",
    title: "Vertex Build Group | Luxury Architecture & Construction",
    description:
      "Award-winning luxury architecture and construction firm. Precision-built spaces across the United States.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Vertex Build Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertex Build Group | Luxury Architecture & Construction",
    description:
      "Award-winning luxury architecture and construction firm. Precision-built spaces across the United States.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Vertex Build Group",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-305-000-0000",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.instagram.com/vertexbuildgroup",
        "https://www.linkedin.com/company/vertexbuildgroup",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Vertex Build Group",
      description:
        "Award-winning luxury architecture and construction firm based in the United States.",
      url: SITE_URL,
      telephone: "+1-305-000-0000",
      email: "hello@vertexbuildgroup.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "100 Brickell Ave, Suite 1200",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33131",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.7617,
        longitude: -80.1918,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "$$$",
    },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={oswald.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
