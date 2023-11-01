interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string; // for additional styles
}

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div
      className={`flex justify-center items-center min-h-screen ${className}`}
    >
      <div>{children}</div>
    </div>
  );
};
