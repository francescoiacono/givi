import classNames from 'classnames';

type ButtonVariants = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  className?: string;
}

export const Button: React.FC<ButtonProps> = props => {
  const { children, variant = 'primary', className, ...rest } = props;

  const cn = classNames(
    'px-2 py-1 uppercase font-bold',
    {
      'text-sm rounded-md bg-blue-800 text-white hover:bg-blue-500 active:bg-blue-700':
        variant === 'primary',
      'px-2 hover:underline text-xs block uppercase font-bold':
        variant === 'secondary'
    },
    className
  );

  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
};
