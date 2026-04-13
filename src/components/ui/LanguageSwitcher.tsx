"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-3 text-sm font-medium tracking-wide">
      <button
        onClick={() => handleLocaleChange('en')}
        className={`px-1 py-1 cursor-pointer transition-all ${
          locale === 'en' ? 'text-brand-blue font-semibold scale-105' : 'text-charcoal-500 opacity-70 hover:opacity-100'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
      <span className="text-charcoal-300 pointer-events-none select-none text-sm">/</span>
      <button
        onClick={() => handleLocaleChange('es')}
        className={`px-1 py-1 cursor-pointer transition-all ${
          locale === 'es' ? 'text-brand-blue font-semibold scale-105' : 'text-charcoal-500 opacity-70 hover:opacity-100'
        }`}
        aria-label="Cambiar a Español"
      >
        Spanish
      </button>
    </div>
  );
}
