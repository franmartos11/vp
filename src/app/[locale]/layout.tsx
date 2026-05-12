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

import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dhengconsulting.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | DH Engineering`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: SITE_URL,
      siteName: "DH Engineering & Consulting LLC",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "DH Engineering & Consulting LLC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DH Engineering & Consulting LLC",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-352-659-3636",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
      sameAs: [
        "https://www.linkedin.com/company/dh-engineering-consulting-llc",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "DH Engineering & Consulting LLC",
      description:
        "Specialized engineering firm providing structural design, MEP coordination, building recertifications, and inspections across Florida.",
      url: SITE_URL,
      telephone: "+1-352-659-3636",
      email: "info@dhengconsulting.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "13951 SW 122th Ave, #206",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33186",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.6385,
        longitude: -80.3925,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
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
