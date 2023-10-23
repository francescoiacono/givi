interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { secondary } = props;

  return (
    <button
      {...props}
      className={
        secondary
          ? 'px-2 hover:underline block'
          : 'p-2 border-2 border-gray-200 rounded-md hover:bg-gray-100 active:bg-gray-200'
      }
    >
      {props.children}
    </button>
  );
};
