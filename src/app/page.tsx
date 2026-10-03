import type { Metadata } from "next";
import { Suspense } from "react";

import { getForecast } from "@/features/forecast/model/getForecast";
import ForecastSkeleton from "@/features/forecast/ui/ForecastSkeleton/ForecastSkeleton";
import { locationKey, parseLocation } from "@/features/places/model/location";
import { placeKey } from "@/features/places/model/place";
import SavedPlaces from "@/features/places/ui/SavedPlaces/SavedPlaces";
import { getLocalization } from "@/features/preferences/model/server";
import Forecast from "@/widgets/Forecast/Forecast";

export const generateMetadata = async ({ searchParams }: PageProps<"/">): Promise<Metadata> => {
  const query = parseLocation(await searchParams);
  const { preferences, t, format } = await getLocalization();
  const result = query ? await getForecast(query, preferences.locale) : null;
  if (!result) return { title: t("error.notFound.title") };
  if (!result.ok) return result.failure === "not-found" ? { title: t("error.notFound.title") } : {};

  const { place, current } = result.forecast;
  const summary = `${format.temperature(current.temperature)} · ${format.sentence(current.condition.description)}`;
  return {
    title: `${place.name} ${summary}`,
    description: `${place.name}: ${summary}. ${t("app.description")}`,
  };
};

const Page = async ({ searchParams }: PageProps<"/">) => {
  const query = parseLocation(await searchParams);
  const { t } = await getLocalization();
  return (
    <>
      <SavedPlaces activeKey={query?.kind === "coordinates" ? placeKey(query) : null} />
      <Suspense key={locationKey(query)} fallback={<ForecastSkeleton label={t("loading.forecast")} />}>
        <Forecast query={query} />
      </Suspense>
    </>
  );
};

export default Page;
