interface FlexRowProps {
  children: React.ReactNode;
}

export const FlexRow: React.FC<FlexRowProps> = ({ children }) => {
  return <div className='flex gap-2'>{children}</div>;
};
