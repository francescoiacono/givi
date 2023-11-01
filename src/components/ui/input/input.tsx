interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = props => {
  return (
    <>
      {props.label ? (
        <label className='flex flex-col' htmlFor={props.id}>
          {props.label}
          <input {...props} className='p-2 border border-gray-400 rounded-md' />
        </label>
      ) : (
        <input {...props} className='p-2 border border-gray-400 rounded-md' />
      )}
    </>
  );
};
