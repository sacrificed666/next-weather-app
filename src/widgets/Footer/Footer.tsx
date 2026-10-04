import type { Translate } from "@/features/i18n/model/translate";
import { site } from "@/shared/lib/site";
import { currentYear } from "@/shared/lib/time";

import styles from "./Footer.module.scss";

const Footer = ({ t }: { t: Translate }) => (
  <footer className={styles.footer}>
    <div className={styles.bar}>
      <div className={styles.credits}>
        <p>© {currentYear()} Illia Movchko</p>
        <p className={styles.sources}>
          <span>
            {t("footer.data")}:{" "}
            <a href="https://openweathermap.org" rel="noreferrer" target="_blank">
              OpenWeatherMap
            </a>
          </span>
          <span>
            {t("footer.icons")}:{" "}
            <a href="https://bas.dev/work/meteocons" rel="noreferrer" target="_blank">
              Meteocons
            </a>
          </span>
          <a href={site.repository} rel="noreferrer" target="_blank">
            {t("footer.source")}
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
