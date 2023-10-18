interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className='py-4 max-w-2xl m-auto'>{children}</div>;
};
