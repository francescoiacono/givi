interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  if (!className) className = '';

  return (
    <div className={`w-full px-4 sm:px-10 md:px-20 lg:px-64 ${className}`}>
      {children}
    </div>
  );
};
