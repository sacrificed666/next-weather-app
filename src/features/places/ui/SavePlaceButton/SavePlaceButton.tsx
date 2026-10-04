"use client";

import { useI18n } from "@/features/i18n/model/useI18n";
import IconButton from "@/shared/ui/IconButton/IconButton";

import type { Place } from "../../model/place";
import { isSaved, savedPlaces, toggleSavedPlace, useStoredPlaces } from "../../model/storedPlaces";

import styles from "./SavePlaceButton.module.scss";

const SavePlaceButton = ({ place }: { place: Place }) => {
  const { t } = useI18n();
  const saved = isSaved(useStoredPlaces(savedPlaces), place);
  return (
    <IconButton
      className={styles.button}
      icon="star"
      label={t("places.save", { name: place.name })}
      aria-pressed={saved}
      onClick={() => toggleSavedPlace(place)}
    />
  );
};

export default SavePlaceButton;
