import Link from "next/link";

import { homeHref, type Locale } from "@/features/i18n/model/locales";
import type { Translate } from "@/features/i18n/model/translate";
import CitySearch from "@/features/places/ui/CitySearch/CitySearch";
import LocateButton from "@/features/places/ui/LocateButton/LocateButton";
import type { EffectsState, Preferences } from "@/features/preferences/model/preferences";
import SettingsMenu from "@/features/preferences/ui/SettingsMenu/SettingsMenu";
import WeatherIcon from "@/shared/ui/WeatherIcon/WeatherIcon";

import styles from "./Header.module.scss";

interface HeaderProps {
  locale: Locale;
  preferences: Preferences;
  effects: EffectsState;
  t: Translate;
}

const Header = ({ locale, preferences, effects, t }: HeaderProps) => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <Link className={styles.brand} href={homeHref(locale)} aria-label={t("app.name")}>
        <WeatherIcon name="partly-cloudy-day" size={40} loading="eager" animated={effects.level === "full"} />
        <span className={styles.name}>{t("app.name")}</span>
      </Link>
      <CitySearch />
      <div className={styles.actions}>
        <LocateButton />
        <SettingsMenu preferences={preferences} deviceEffects={effects.device} />
      </div>
    </div>
  </header>
);

export default Header;
