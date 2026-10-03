"use client";

import { useId, useOptimistic, useTransition } from "react";

import { localeDetails, locales } from "@/features/i18n/model/locales";
import { useI18n } from "@/features/i18n/model/useI18n";
import Flag from "@/shared/ui/Flag/Flag";
import Icon from "@/shared/ui/Icon/Icon";
import IconButton from "@/shared/ui/IconButton/IconButton";
import SegmentedControl from "@/shared/ui/SegmentedControl/SegmentedControl";

import { savePreference } from "../../model/actions";
import type { PreferenceName, Preferences } from "../../model/preferences";

import styles from "./SettingsMenu.module.scss";

const SettingsMenu = ({ preferences }: { preferences: Preferences }) => {
  const { t } = useI18n();
  const panelId = useId();
  const titleId = useId();
  const [saving, startSaving] = useTransition();
  const [current, setCurrent] = useOptimistic(preferences, (state, change: Partial<Preferences>) => ({
    ...state,
    ...change,
  }));

  const update = <Name extends PreferenceName>(name: Name, value: Preferences[Name]) => {
    if (name === "theme") document.documentElement.dataset.theme = value;
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
          onChange={(value) => update("theme", value)}
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

        <fieldset className={styles.languages}>
          <legend className={styles.legend}>{t("settings.language")}</legend>
          <div className={styles.grid}>
            {locales.map((locale) => (
              <label key={locale} className={styles.language} lang={locale}>
                <input
                  className={styles.input}
                  type="radio"
                  name="locale"
                  value={locale}
                  checked={current.locale === locale}
                  onChange={() => update("locale", locale)}
                />
                <Flag country={localeDetails[locale].flag} height={14} />
                {localeDetails[locale].name}
              </label>
            ))}
          </div>
        </fieldset>
      </dialog>
    </>
  );
};

export default SettingsMenu;
