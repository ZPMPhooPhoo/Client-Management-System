import React from 'react';

interface SelectBoxProps {
  options: { label: string; value: string }[];
  name: string;
  value: string | undefined;
  onChange: (selectedOption: string, selectedIndex: number) => void;
}


export const SelectBox: React.FC<SelectBoxProps> = ({ name, value, options, onChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption.value, selectedIndex);
  };

  return (
    <select name={name} className="selectbox" value={value} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

  );
};
