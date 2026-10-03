import type { Sky as SkyName } from "../../model/conditions";

import styles from "./Sky.module.scss";

const Sky = ({ sky }: { sky: SkyName }) => (
  <div className={styles.sky} data-sky={sky} aria-hidden="true">
    <span className={styles.glow} />
    <span className={styles.texture} />
  </div>
);

export default Sky;
