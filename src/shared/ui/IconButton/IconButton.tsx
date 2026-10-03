import type { ButtonHTMLAttributes } from "react";

import { cx } from "@/shared/lib/cx";

import Icon from "../Icon/Icon";
import type { IconName } from "../Icon/icons";

import styles from "./IconButton.module.scss";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> {
  icon: IconName;
  label: string;
  busy?: boolean;
}

const IconButton = ({ icon, label, busy = false, className, ...props }: IconButtonProps) => (
  <button
    {...props}
    type="button"
    className={cx(styles.button, className)}
    aria-label={label}
    title={label}
    aria-busy={busy || undefined}
  >
    <Icon name={busy ? "loader" : icon} size={19} className={busy ? styles.spinner : undefined} />
  </button>
);

export default IconButton;
