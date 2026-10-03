"use client";

import { useOffline } from "next/offline";

import { useI18n } from "@/features/i18n/model/useI18n";
import Icon from "@/shared/ui/Icon/Icon";

import styles from "./OfflineNotice.module.scss";

const OfflineNotice = () => {
  const { t } = useI18n();
  const offline = useOffline();
  return (
    <output className={styles.notice} hidden={!offline}>
      <Icon name="offline" size={18} />
      {t("offline.message")}
    </output>
  );
};

export default OfflineNotice;
