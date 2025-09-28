// src/components/Select/Select.tsx
import React from "react";
import "./style.css";

type Option = { value: string; label: string };

type SelectProps = {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  name,
  options,
  value = "", // デフォルト値を設定
  onChange,
}: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="p-cats-parameter__select-wrapper">
      <select
        className="p-cats-parameter__select"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
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
