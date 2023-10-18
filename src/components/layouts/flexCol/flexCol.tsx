interface FlexColProps {
  children: React.ReactNode;
}

export const FlexCol: React.FC<FlexColProps> = ({ children }) => {
  return <div className='flex flex-col gap-2'>{children}</div>;
};
