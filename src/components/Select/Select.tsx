import React from "react";
import "./style.css";

type Option = { value: string; label: string };

type SelectProps = {
  name: string;
  options: Option[];
};

const Select: React.FC<SelectProps> = ({ name, options }) => {
  return (
    <div className="p-cats-parameter__select-wrapper">
      <select className="p-cats-parameter__select" name={name} id={name}>
        <option value="">選択してください</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
