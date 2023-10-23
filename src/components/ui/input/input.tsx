interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withLabel?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.withLabel ? (
        <label className='flex flex-col' htmlFor={props.id}>
          {props.withLabel}
          <input {...props} className='p-2 border border-gray-400 rounded-md' />
        </label>
      ) : (
        <input {...props} className='p-2 border border-gray-400 rounded-md' />
      )}
    </>
  );
};
