import { use } from "react";

import { I18nContext } from "./context";
import { localeDetails } from "./locales";
import { createTranslator } from "./translate";

export const useI18n = () => {
  const value = use(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return {
    locale: value.locale,
    intlLocale: localeDetails[value.locale].intl,
    t: createTranslator(value.messages),
  };
};
