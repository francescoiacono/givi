import { FlexCol } from '@/components/layouts';

export const SmallAbout = () => {
  return (
    <FlexCol className='w-[14rem] flex-auto'>
      <div className='w-16 h-16 border border-gray-600 rounded-full flex items-center justify-center'></div>
      <div className='p-2'>
        <p className='font-bold pb-1'>About me</p>
        <p className='text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsa
          optio maxime a.
        </p>
      </div>
    </FlexCol>
  );
};
