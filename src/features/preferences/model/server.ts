import "server-only";
import { cookies, headers } from "next/headers";
import { locale as rootLocale } from "next/root-params";
import { cache } from "react";

import { getMessages } from "@/features/i18n/model/catalog";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  localeDetails,
  localeHeader,
  matchLocale,
  type Locale,
} from "@/features/i18n/model/locales";
import { createTranslator } from "@/features/i18n/model/translate";
import { createFormatter } from "@/shared/lib/format";
import { isUnitSystem } from "@/shared/lib/units";

import { defaultPreferences, isTheme, preferenceCookies, type Preferences } from "./preferences";

export const getPreferences = cache(async (): Promise<Preferences> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get(preferenceCookies.theme)?.value;
  const units = cookieStore.get(preferenceCookies.units)?.value;
  return {
    theme: isTheme(theme) ? theme : defaultPreferences.theme,
    units: isUnitSystem(units) ? units : defaultPreferences.units,
  };
});

export const currentLocale = cache(async (): Promise<Locale> => {
  const value = await rootLocale();
  return isLocale(value) ? value : defaultLocale;
});

export const requestLocale = async (): Promise<Locale> => {
  const [requestHeaders, cookieStore] = await Promise.all([headers(), cookies()]);
  const routed = requestHeaders.get(localeHeader);
  if (isLocale(routed)) return routed;
  const saved = cookieStore.get(localeCookie)?.value;
  return isLocale(saved) ? saved : matchLocale(requestHeaders.get("accept-language"));
};

const localize = async (locale: Locale) => {
  const preferences = await getPreferences();
  const messages = getMessages(locale);
  return {
    locale,
    preferences,
    messages,
    t: createTranslator(messages),
    format: createFormatter(localeDetails[locale].intl, preferences.units),
  };
};

export const getLocalization = cache(async () => localize(await currentLocale()));

export const getRequestLocalization = cache(async () => localize(await requestLocale()));
