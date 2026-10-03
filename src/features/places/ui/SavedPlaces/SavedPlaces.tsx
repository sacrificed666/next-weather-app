"use client";

import Link from "next/link";

import { useI18n } from "@/features/i18n/model/useI18n";
import Flag from "@/shared/ui/Flag/Flag";
import Icon from "@/shared/ui/Icon/Icon";

import { placeHref, placeKey } from "../../model/place";
import { removeSavedPlace, savedPlaces, useStoredPlaces } from "../../model/storedPlaces";

import styles from "./SavedPlaces.module.scss";

const SavedPlaces = ({ activeKey }: { activeKey: string | null }) => {
  const { t } = useI18n();
  const places = useStoredPlaces(savedPlaces);
  if (places.length === 0) return null;

  return (
    <nav className={styles.places} aria-label={t("places.title")}>
      <ul className={styles.list}>
        {places.map((place) => {
          const key = placeKey(place);
          return (
            <li key={key} className={styles.chip}>
              <Link
                className={styles.link}
                href={placeHref(place)}
                aria-current={key === activeKey ? "page" : undefined}
              >
                {place.country && <Flag country={place.country} height={12} />}
                {place.name}
              </Link>
              <button
                className={styles.remove}
                type="button"
                aria-label={t("places.remove", { name: place.name })}
                onClick={() => removeSavedPlace(place)}
              >
                <Icon name="close" size={14} />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SavedPlaces;
