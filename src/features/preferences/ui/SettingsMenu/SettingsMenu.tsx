"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useId, useOptimistic, useTransition } from "react";

import { localeCookie, localeDetails, locales, switchLocale, type Locale } from "@/features/i18n/model/locales";
import { useI18n } from "@/features/i18n/model/useI18n";
import Flag from "@/shared/ui/Flag/Flag";
import Icon from "@/shared/ui/Icon/Icon";
import IconButton from "@/shared/ui/IconButton/IconButton";
import SegmentedControl from "@/shared/ui/SegmentedControl/SegmentedControl";

import { savePreference } from "../../model/actions";
import type { Effects, EffectsLevel, PreferenceName, Preferences } from "../../model/preferences";

import styles from "./SettingsMenu.module.scss";

const ONE_YEAR = 60 * 60 * 24 * 365;

const rememberLocale = (locale: Locale) => {
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax${secure}`;
};

interface SettingsMenuProps {
  preferences: Preferences;
  deviceEffects: EffectsLevel;
}

const SettingsMenu = ({ preferences, deviceEffects }: SettingsMenuProps) => {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.size > 0 ? `?${searchParams.toString()}` : "";
  const panelId = useId();
  const titleId = useId();
  const languagesId = useId();
  const [saving, startSaving] = useTransition();
  const [current, setCurrent] = useOptimistic(preferences, (state, change: Partial<Preferences>) => ({
    ...state,
    ...change,
  }));

  const update = <Name extends PreferenceName>(name: Name, value: Preferences[Name]) => {
    startSaving(async () => {
      setCurrent({ [name]: value });
      await savePreference(name, value);
    });
  };

  return (
    <>
      <IconButton icon="sliders" label={t("settings.open")} popoverTarget={panelId} busy={saving} />
      <dialog className={styles.panel} id={panelId} popover="auto" aria-labelledby={titleId}>
        <div className={styles.header}>
          <h2 className={styles.title} id={titleId}>
            {t("settings.title")}
          </h2>
          <button
            className={styles.close}
            type="button"
            popoverTarget={panelId}
            popoverTargetAction="hide"
            aria-label={t("settings.close")}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <SegmentedControl
          legend={t("settings.theme")}
          name="theme"
          value={current.theme}
          onChange={(value) => {
            document.documentElement.dataset.theme = value;
            update("theme", value);
          }}
          options={[
            { value: "system", label: t("settings.theme.system"), icon: "auto" },
            { value: "light", label: t("settings.theme.light"), icon: "sun" },
            { value: "dark", label: t("settings.theme.dark"), icon: "moon" },
          ]}
        />

        <SegmentedControl
          legend={t("settings.units")}
          name="units"
          value={current.units}
          onChange={(value) => update("units", value)}
          options={[
            { value: "metric", label: t("settings.units.metric") },
            { value: "imperial", label: t("settings.units.imperial") },
          ]}
        />

        <SegmentedControl
          legend={t("settings.effects")}
          name="effects"
          value={current.effects}
          description={
            current.effects === "auto"
              ? t("settings.effects.device", { mode: t(`settings.effects.${deviceEffects}`) })
              : undefined
          }
          onChange={(value: Effects) => {
            document.documentElement.dataset.effects = value === "auto" ? deviceEffects : value;
            update("effects", value);
          }}
          options={[
            { value: "auto", label: t("settings.effects.auto") },
            { value: "full", label: t("settings.effects.full") },
            { value: "reduced", label: t("settings.effects.reduced") },
          ]}
        />

        <div className={styles.languages}>
          <h3 className={styles.legend} id={languagesId}>
            {t("settings.language")}
          </h3>
          <ul className={styles.grid} aria-labelledby={languagesId}>
            {locales.map((entry) => (
              <li key={entry}>
                <a
                  className={styles.language}
                  href={`${switchLocale(pathname, entry)}${search}`}
                  hrefLang={entry}
                  lang={entry}
                  aria-current={entry === locale ? "true" : undefined}
                  onClick={() => rememberLocale(entry)}
                >
                  <Flag country={localeDetails[entry].flag} height={14} />
                  {localeDetails[entry].name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
};

export default SettingsMenu;
