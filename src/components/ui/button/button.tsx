interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className='p-2 border-2 border-gray-200 rounded-md hover:bg-gray-100 active:bg-gray-200'
    >
      {props.children}
    </button>
  );
};
