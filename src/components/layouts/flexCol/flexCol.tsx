interface FlexColProps {
  children: React.ReactNode;
  className?: string;
}

export const FlexCol: React.FC<FlexColProps> = ({ children, className }) => {
  return <div className={`${className} flex flex-col gap-2`}>{children}</div>;
};
