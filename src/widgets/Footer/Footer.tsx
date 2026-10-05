import type { Translate } from "@/features/i18n/model/translate";
import { SITE } from "@/shared/lib/site";
import { currentYear } from "@/shared/lib/time";

import styles from "./Footer.module.scss";

const Footer = ({ t }: { t: Translate }) => {
  const newTab = <span className={styles.hint}> ({t("external.newTab")})</span>;

  return (
    <footer className={styles.footer}>
      <div className={styles.bar}>
        <p className={styles.owner}>
          © {currentYear()} {SITE.author.name}
          <span aria-hidden="true">·</span>
          <a href={SITE.changelog} rel="noreferrer" target="_blank">
            v{SITE.version}
            {newTab}
          </a>
        </p>
        <p className={styles.links}>
          <span>
            {t("footer.data")}:{" "}
            <a href="https://openweathermap.org" rel="noreferrer" target="_blank">
              OpenWeatherMap
              {newTab}
            </a>
          </span>
          <span>
            {t("footer.icons")}:{" "}
            <a href="https://bas.dev/work/meteocons" rel="noreferrer" target="_blank">
              Meteocons
              {newTab}
            </a>
          </span>
          <a href={SITE.repository} rel="noreferrer" target="_blank">
            {t("footer.source")}
            {newTab}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
