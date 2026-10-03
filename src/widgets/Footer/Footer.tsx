import type { Translate } from "@/features/i18n/model/translate";
import { currentYear } from "@/shared/lib/time";
import Icon from "@/shared/ui/Icon/Icon";
import type { IconName } from "@/shared/ui/Icon/icons";

import styles from "./Footer.module.scss";

const SOCIALS: readonly { label: string; href: string; icon: IconName }[] = [
  { label: "GitHub", href: "https://github.com/sacrificed666", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/illiamovchko/", icon: "linkedin" },
  { label: "Email", href: "mailto:illia.movchko.concept@gmail.com", icon: "mail" },
];

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
          <a href="https://github.com/sacrificed666/next-weather-app" rel="noreferrer" target="_blank">
            {t("footer.source")}
          </a>
        </p>
      </div>
      <ul className={styles.socials}>
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a className={styles.social} href={social.href} rel="noreferrer" target="_blank" aria-label={social.label}>
              <Icon name={social.icon} size={20} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
