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
    <div className="flex items-center gap-1 text-sm font-medium tracking-wide">
      <button
        onClick={() => handleLocaleChange('en')}
        className={`px-1 py-1 transition-all ${
          locale === 'en' ? 'text-brand-blue font-semibold scale-110' : 'text-charcoal-500 opacity-70 hover:opacity-100'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-charcoal-300 pointer-events-none select-none text-xs">|</span>
      <button
        onClick={() => handleLocaleChange('es')}
        className={`px-1 py-1 transition-all ${
          locale === 'es' ? 'text-brand-blue font-semibold scale-110' : 'text-charcoal-500 opacity-70 hover:opacity-100'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
