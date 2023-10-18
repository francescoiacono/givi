interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.children && <label htmlFor={props.name}>{props.children}</label>}
      <input {...props} className='p-2 border-2 border-gray-200 rounded-md' />
    </>
  );
};
