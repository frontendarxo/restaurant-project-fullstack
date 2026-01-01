import './style.css';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ type, children, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};