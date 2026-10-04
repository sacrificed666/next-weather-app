import "@fontsource-variable/montserrat";
import "@/app/globals.scss";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/features/i18n/model/locales";
import I18nProvider from "@/features/i18n/ui/I18nProvider/I18nProvider";
import { getEffects, getLocalization } from "@/features/preferences/model/server";
import OfflineNotice from "@/features/preferences/ui/OfflineNotice/OfflineNotice";
import { social } from "@/features/seo/model/seo";
import { isIndexable, site, siteUrl } from "@/shared/lib/site";
import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";

import styles from "./layout.module.scss";

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async (): Promise<Metadata> => {
  const { locale, t } = await getLocalization();
  const name = t("app.name");
  const description = t("app.description");
  return {
    metadataBase: siteUrl(),
    title: { default: name, template: `%s · ${name}` },
    description,
    applicationName: name,
    keywords: [...site.keywords],
    authors: [{ name: site.author.name, url: site.author.url }],
    creator: site.author.name,
    publisher: site.author.name,
    category: "weather",
    ...social(locale, t, { title: name, description }),
    robots: isIndexable()
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: false },
    formatDetection: { telephone: false, address: false, email: false },
  };
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: site.themeColor.dark },
  ],
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  if (!isLocale((await params).locale)) notFound();
  const [{ locale, preferences, messages, t }, effects] = await Promise.all([getLocalization(), getEffects()]);
  return (
    <html lang={locale} data-theme={preferences.theme} data-effects={effects.level}>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          <a className="skip-link" href="#forecast">
            {t("app.skip")}
          </a>
          <Header locale={locale} preferences={preferences} effects={effects} t={t} />
          <main className={styles.main} id="forecast" tabIndex={-1}>
            {children}
          </main>
          <Footer t={t} />
          <OfflineNotice />
        </I18nProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
