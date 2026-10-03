import "server-only";
import type { Locale } from "./locales";
import { de } from "./messages/de";
import { en, type Messages } from "./messages/en";
import { es } from "./messages/es";
import { fr } from "./messages/fr";
import { it } from "./messages/it";
import { nl } from "./messages/nl";
import { pl } from "./messages/pl";
import { uk } from "./messages/uk";

const catalog: Record<Locale, Messages> = { en, uk, de, es, fr, it, nl, pl };

export const getMessages = (locale: Locale): Messages => catalog[locale];
