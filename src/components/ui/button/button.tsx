interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export const Button: React.FC<ButtonProps> = props => {
  const { secondary } = props;

  return (
    <button
      {...props}
      className={
        secondary
          ? 'px-2 hover:underline text-xs block uppercase font-bold'
          : 'px-2 py-1 uppercase font-bold text-sm rounded-md bg-blue-800 text-white hover:bg-blue-500 active:bg-blue-700'
      }
    >
      {props.children}
    </button>
  );
};
