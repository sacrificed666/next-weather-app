import styles from "./Flag.module.scss";

interface FlagProps {
  country: string;
  height?: number;
}

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
