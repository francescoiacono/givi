interface FlexRowProps {
  children: React.ReactNode;
  className?: string;
}

export const FlexRow: React.FC<FlexRowProps> = ({ children, className }) => {
  return <div className={`${className} flex gap-2`}>{children}</div>;
};
