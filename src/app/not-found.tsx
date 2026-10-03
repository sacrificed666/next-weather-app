import Link from "next/link";

import { getLocalization } from "@/features/preferences/model/server";
import Icon from "@/shared/ui/Icon/Icon";

import styles from "./not-found.module.scss";

const NotFound = async () => {
  const { t } = await getLocalization();
  return (
    <section className={styles.notFound}>
      <span className={styles.badge}>
        <Icon name="pin" size={28} />
      </span>
      <h1 className={styles.title}>{t("notFound.title")}</h1>
      <p className={styles.text}>{t("notFound.text")}</p>
      <Link className={styles.link} href="/">
        {t("error.home")}
      </Link>
    </section>
  );
};

export default NotFound;
