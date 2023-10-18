interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props} className='p-2 border-2 border-gray-200 rounded-md'>
      {props.children}
    </button>
  );
};
