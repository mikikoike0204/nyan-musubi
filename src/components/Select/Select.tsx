import React from "react";
import "./Select.css";

type Option = { value: string; label: string };

type SelectProps = {
  name: string;
  options: Option[];
};

const Select: React.FC<SelectProps> = ({ name, options }) => {
  return (
    <div className="select-wrapper w-full">
      <select
        className="border border-gray-300 h-8 px-3 text-sm"
        name={name}
        id={name}
      >
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
