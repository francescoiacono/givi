interface ClientErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ClientErrorMessage: React.FC<ClientErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <h3 className='text-red-500'>Error</h3>
      <p className='text-red-500'>{children}</p>
    </div>
  );
};
