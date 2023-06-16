type ButtonProps = {
  onClick?: (e: React.FormEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  disabled?: boolean;
}

export const Button = ({ onClick, className, type = 'submit', text }: ButtonProps) => {
  return (
    <div className='btn'>
      <button
        className={className}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}