import { useSyncExternalStore } from "react";

import { createStoredList, type StoredList } from "@/shared/lib/storedList";

import { parsePlace, placeKey, type Place } from "./place";

export const SAVED_PLACES_LIMIT = 12;

export const savedPlaces = createStoredList("next-weather-app/saved-places", parsePlace, SAVED_PLACES_LIMIT);

export const recentPlaces = createStoredList("next-weather-app/recent-places", parsePlace, 5);

export const useStoredPlaces = (list: StoredList<Place>) =>
  useSyncExternalStore(list.subscribe, list.getSnapshot, list.getServerSnapshot);

const without = (places: readonly Place[], place: Place) =>
  places.filter((candidate) => placeKey(candidate) !== placeKey(place));

export const isSaved = (places: readonly Place[], place: Place) =>
  places.some((candidate) => placeKey(candidate) === placeKey(place));

export const canSavePlace = (places: readonly Place[], place: Place) =>
  isSaved(places, place) || places.length < SAVED_PLACES_LIMIT;

export const toggleSavedPlace = (place: Place) => {
  const places = savedPlaces.getSnapshot();
  if (isSaved(places, place)) savedPlaces.replace(without(places, place));
  else if (canSavePlace(places, place)) savedPlaces.replace([...places, place]);
};

export const removeSavedPlace = (place: Place) => savedPlaces.replace(without(savedPlaces.getSnapshot(), place));

export const rememberPlace = (place: Place) =>
  recentPlaces.replace([place, ...without(recentPlaces.getSnapshot(), place)]);

export const clearRecentPlaces = () => recentPlaces.replace([]);
