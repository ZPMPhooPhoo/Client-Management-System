interface CheckboxProps {
  className: string;
  label: string;
  name: string
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, name, className, onChange }) => {
  const handleChange = () => {
    const newChecked = !checked;
    onChange(newChecked);
  };
  return (
    <div>
      <label style={{display:'flex' ,flexDirection:'row' ,alignItems:'center'}}>
        <input type="checkbox" name={name} className={className} checked={checked} onChange={handleChange} />
        <span style={{width: "250px"}}>{label}</span>
      </label>
    </div>
    
  );
};
