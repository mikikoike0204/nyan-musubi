// src/components/Checkbox/Checkbox.tsx
import React from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkboxLabelInput}
      />
      <span className={styles.checkboxBox}></span>
      <span className={styles.checkboxText}>{label}</span>
    </label>
  );
};

export default Checkbox;
