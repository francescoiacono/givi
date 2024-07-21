import { FlexCol } from '@/components/layouts';
import Image from 'next/image';

export const SmallAbout = () => {
  return (
    <FlexCol className='lg:w-[14rem] md:w-full'>
      <Image
        src='/assets/images/avatar.png'
        width={64}
        height={64}
        alt='avatar'
      />
      <div>
        <p className='font-bold pb-1'>About me</p>
        <p className='text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsa
          optio maxime a.
        </p>
      </div>
    </FlexCol>
  );
};
