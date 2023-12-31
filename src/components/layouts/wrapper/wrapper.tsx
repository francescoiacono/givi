interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={`${className} py-4 max-w-5xl m-auto`}>{children}</div>;
};
