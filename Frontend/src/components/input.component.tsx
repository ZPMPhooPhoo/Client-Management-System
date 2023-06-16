type InputProps = {
  type?: string,
  placeholder: string;
  value: string;
  name: string;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, name, id }) => {
  return <input className="input" type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange} />;
};