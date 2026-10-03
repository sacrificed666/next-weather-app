import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";

import type { Locale } from "@/features/i18n/model/locales";
import { en } from "@/features/i18n/model/messages/en";
import { uk } from "@/features/i18n/model/messages/uk";
import I18nProvider from "@/features/i18n/ui/I18nProvider/I18nProvider";

export const renderWithI18n = (ui: ReactElement, locale: Extract<Locale, "en" | "uk"> = "en") => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <I18nProvider locale={locale} messages={locale === "uk" ? uk : en}>
      {children}
    </I18nProvider>
  );
  return { user: userEvent.setup(), ...render(ui, { wrapper }) };
};
