import React, { useState } from "react";

interface CheckboxProps {
  className:string;
  label: string;
  name:string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({name,label,className, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
        <div>
          <input type="checkbox"name={name} className={className} checked={checked} onChange={handleChange} /> 
          <label htmlFor="">{label}</label>
        </div>
  );
};

export default Checkbox;