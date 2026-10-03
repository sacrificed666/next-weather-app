import Link from "next/link";

import type { Translate } from "@/features/i18n/model/translate";
import CitySearch from "@/features/places/ui/CitySearch/CitySearch";
import LocateButton from "@/features/places/ui/LocateButton/LocateButton";
import type { Preferences } from "@/features/preferences/model/preferences";
import SettingsMenu from "@/features/preferences/ui/SettingsMenu/SettingsMenu";
import WeatherIcon from "@/shared/ui/WeatherIcon/WeatherIcon";

import styles from "./Header.module.scss";

interface HeaderProps {
  preferences: Preferences;
  t: Translate;
}

const Header = ({ preferences, t }: HeaderProps) => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <Link className={styles.brand} href="/" aria-label={t("app.name")}>
        <WeatherIcon name="partly-cloudy-day" size={40} priority />
        <span className={styles.name}>{t("app.name")}</span>
      </Link>
      <CitySearch />
      <div className={styles.actions}>
        <LocateButton />
        <SettingsMenu preferences={preferences} />
      </div>
    </div>
  </header>
);

export default Header;
