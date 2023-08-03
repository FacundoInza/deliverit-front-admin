import React from 'react';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import avatarImage from '@components/commons/circular-image/imagen.png';
import MainButton from '@components/commons/buttons/MainButton';

interface AdminDetailsCardProps {
    title: string;
    subtitle: string;
}

export const AdminDetailsCard: React.FC<AdminDetailsCardProps> = ({
    title,
    subtitle,
}) => {
    return (
        <div className='ml-1 mr-1 lg:ml-50 lg:mr-50 py-2 px-2 bg-white border-t-0.5 border-primary border-dotted md:border-dashed flex'>
            <div className='flex flex-col'>
                <div className='flex-grow'>
                    <CircularImage
                        src={avatarImage}
                        alt={'Avatar image'}
                        diameter={57}
                    />
                </div>
                <div className='flex'>
                    <CircularImage
                        src={avatarImage}
                        alt={'Avatar image'}
                        diameter={20}
                    />
                    <CircularImage
                        src={avatarImage}
                        alt={'Avatar image'}
                        diameter={20}
                    />
                </div>
            </div>
            <div className='flex flex-col ml-2 flex-grow h-36'>
                <div className='text-center space-y-1 sm:text-left flex justify-between'>
                    <h2 className='text-xl my-2 font-bold text-primary'>
                        {title}
                    </h2>
                </div>
                <div>
                    <p className='pt-1 text-md font-medium flex text-primary'>
                        {subtitle}
                    </p>
                </div>
            </div>
            <div className='ml-2 flex items-end mt-32'>
                <MainButton text='See more' btnGreen={true} />
            </div>
        </div>
    );
};
