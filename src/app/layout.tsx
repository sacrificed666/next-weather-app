import "@fontsource-variable/montserrat";
import "./globals.scss";
import type { Metadata, Viewport } from "next";

import I18nProvider from "@/features/i18n/ui/I18nProvider/I18nProvider";
import { getLocalization } from "@/features/preferences/model/server";
import OfflineNotice from "@/features/preferences/ui/OfflineNotice/OfflineNotice";
import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";

import styles from "./layout.module.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getLocalization();
  return {
    title: { default: t("app.name"), template: `%s · ${t("app.name")}` },
    description: t("app.description"),
    applicationName: t("app.name"),
    authors: [{ name: "Illia Movchko", url: "https://github.com/sacrificed666" }],
    creator: "Illia Movchko",
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: { type: "website", title: t("app.name"), description: t("app.description") },
  };
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dbe5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1020" },
  ],
};

const RootLayout = async ({ children }: LayoutProps<"/">) => {
  const { preferences, messages, t } = await getLocalization();
  return (
    <html lang={preferences.locale} data-theme={preferences.theme}>
      <body>
        <I18nProvider locale={preferences.locale} messages={messages}>
          <a className="skip-link" href="#forecast">
            {t("app.skip")}
          </a>
          <Header preferences={preferences} t={t} />
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

export default RootLayout;
