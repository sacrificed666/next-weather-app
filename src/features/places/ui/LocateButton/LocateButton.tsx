"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useI18n } from "@/features/i18n/model/useI18n";
import IconButton from "@/shared/ui/IconButton/IconButton";

import { placeHref } from "../../model/place";

import styles from "./LocateButton.module.scss";

type Status = "idle" | "locating" | "denied" | "failed";

const MESSAGE_DURATION_MS = 6000;

const LocateButton = () => {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [navigating, startNavigation] = useTransition();
  const failed = status === "denied" || status === "failed";

  useEffect(() => {
    if (!failed) return;
    const timer = setTimeout(() => setStatus("idle"), MESSAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [failed]);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setStatus("failed");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setStatus("idle");
        startNavigation(() => router.push(placeHref(locale, coords)));
      },
      (error) => setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "failed"),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 10 * 60_000 },
    );
  };

  return (
    <div className={styles.locate}>
      <IconButton
        icon="locate"
        label={status === "locating" ? t("locate.pending") : t("locate.label")}
        busy={status === "locating" || navigating}
        onClick={locate}
      />
      <output className={styles.message} hidden={!failed}>
        {status === "denied" ? t("locate.denied") : t("locate.failed")}
      </output>
    </div>
  );
};

export default LocateButton;
