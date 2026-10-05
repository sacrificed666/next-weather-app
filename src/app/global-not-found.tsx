import "@fontsource-variable/montserrat";
import "./globals.scss";
import type { Metadata } from "next";

import { homeHref } from "@/features/i18n/model/locales";
import { documentTitle } from "@/features/seo/model/seo";
import { getEffects, getRequestLocalization } from "@/features/settings/model/server";
import Icon from "@/shared/ui/Icon/Icon";
import Logo from "@/shared/ui/Logo/Logo";

import styles from "./not-found.module.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getRequestLocalization();
  return { title: documentTitle(t("notFound.title"), t), robots: { index: false, follow: true } };
};

const GlobalNotFound = async () => {
  const [{ locale, preferences, t }, effects] = await Promise.all([getRequestLocalization(), getEffects()]);
  return (
    <html lang={locale} data-theme={preferences.theme} data-effects={effects.level}>
      <body>
        <main className={styles.page}>
          <a className={styles.brand} href={homeHref(locale)}>
            <Logo className={styles.logo} />
            {t("app.name")}
          </a>
          <section className={styles.notFound} aria-labelledby="not-found-title">
            <span className={styles.badge}>
              <Icon name="pin" size={28} />
            </span>
            <h1 className={styles.title} id="not-found-title">
              {t("notFound.title")}
            </h1>
            <p className={styles.text}>{t("notFound.text")}</p>
            <a className={styles.link} href={homeHref(locale)}>
              {t("error.home")}
            </a>
          </section>
        </main>
      </body>
    </html>
  );
};

export default GlobalNotFound;
