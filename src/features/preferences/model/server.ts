import "server-only";
import { cookies, headers } from "next/headers";
import { cache } from "react";

import { getMessages } from "@/features/i18n/model/catalog";
import { isLocale, localeDetails, matchLocale } from "@/features/i18n/model/locales";
import { createTranslator } from "@/features/i18n/model/translate";
import { createFormatter } from "@/shared/lib/format";
import { isUnitSystem } from "@/shared/lib/units";

import { defaultPreferences, isTheme, preferenceCookies, type Preferences } from "./preferences";

export const getPreferences = cache(async (): Promise<Preferences> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get(preferenceCookies.theme)?.value;
  const units = cookieStore.get(preferenceCookies.units)?.value;
  const locale = cookieStore.get(preferenceCookies.locale)?.value;
  return {
    theme: isTheme(theme) ? theme : defaultPreferences.theme,
    units: isUnitSystem(units) ? units : defaultPreferences.units,
    locale: isLocale(locale) ? locale : matchLocale((await headers()).get("accept-language")),
  };
});

export const getLocalization = cache(async () => {
  const preferences = await getPreferences();
  const messages = getMessages(preferences.locale);
  return {
    preferences,
    messages,
    t: createTranslator(messages),
    format: createFormatter(localeDetails[preferences.locale].intl, preferences.units),
  };
});
