import styles from "./Flag.module.scss";

interface FlagProps {
  country: string;
  height?: number;
}

// A country flag served by the app
const Flag = ({ country, height = 16 }: FlagProps) => (
  <img
    className={styles.flag}
    src={`/flags/${country}`}
    width={Math.round((height * 3) / 2)}
    height={height}
    alt=""
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);

export default Flag;
