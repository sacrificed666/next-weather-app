"use client";

import { useSyncExternalStore } from "react";

import { useI18n } from "@/features/i18n/model/useI18n";
import { createFormatter } from "@/shared/lib/format";

const TICK_MS = 15_000;

const subscribe = (onTick: () => void) => {
  const timer = setInterval(onTick, TICK_MS);
  return () => clearInterval(timer);
};

const currentMinute = () => Math.floor(Date.now() / 60_000);

interface LocalClockProps {
  timezoneOffset: number;
  renderedAt: number;
}

const LocalClock = ({ timezoneOffset, renderedAt }: LocalClockProps) => {
  const { intlLocale } = useI18n();
  const minute = useSyncExternalStore(subscribe, currentMinute, () => Math.floor(renderedAt / 60));
  const seconds = minute * 60;
  const format = createFormatter(intlLocale, "metric");
  return (
    <time dateTime={new Date(seconds * 1000).toISOString()} suppressHydrationWarning>
      {format.date(seconds, timezoneOffset)}, {format.time(seconds, timezoneOffset)}
    </time>
  );
};

export default LocalClock;
