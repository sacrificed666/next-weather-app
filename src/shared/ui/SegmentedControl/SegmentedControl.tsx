"use client";

import Icon from "../Icon/Icon";
import type { IconName } from "../Icon/icons";

import styles from "./SegmentedControl.module.scss";

export interface SegmentedOption<Value extends string> {
  value: Value;
  label: string;
  icon?: IconName;
}

interface SegmentedControlProps<Value extends string> {
  legend: string;
  name: string;
  value: Value;
  options: readonly SegmentedOption<Value>[];
  onChange: (value: Value) => void;
}

const SegmentedControl = <Value extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: SegmentedControlProps<Value>) => (
  <fieldset className={styles.control}>
    <legend className={styles.legend}>{legend}</legend>
    <div className={styles.track}>
      {options.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            className={styles.input}
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.icon && <Icon name={option.icon} size={15} />}
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

export default SegmentedControl;
