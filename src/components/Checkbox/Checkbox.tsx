// src/components/Checkbox/Checkbox.tsx
import React from "react";
import "./style.css";

type CheckboxProps = {
  label: string;
  name: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, name }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" name={name} />
      <span className="checkbox-box"></span>
      <span className="checkbox-text text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
