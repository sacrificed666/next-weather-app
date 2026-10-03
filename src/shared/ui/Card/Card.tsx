import { type ReactNode, useId } from "react";

import { cx } from "@/shared/lib/cx";

import Icon from "../Icon/Icon";
import type { IconName } from "../Icon/icons";

import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  icon: IconName;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, icon, children, className }: CardProps) => {
  const headingId = useId();
  return (
    <section className={cx(styles.card, className)} aria-labelledby={headingId}>
      <h2 className={styles.title} id={headingId}>
        <Icon name={icon} size={15} />
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Card;
