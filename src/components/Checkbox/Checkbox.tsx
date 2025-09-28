// src/components/Checkbox/Checkbox.tsx
import React from "react";
import "./style.css";

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
    <label className="checkbox-label">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-box"></span>
      <span className="checkbox-text text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
