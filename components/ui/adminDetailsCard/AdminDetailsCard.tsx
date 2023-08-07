import React from 'react';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import MainButton from '@components/commons/buttons/MainButton';
import { CircularProgress } from '@components/commons/circular-progress/CircularProgress';

interface AdminDetailsCardProps {
    title: string;
    subtitle: string;
    avatars?: Array<object>;
}

export const AdminDetailsCard: React.FC<AdminDetailsCardProps> = ({
    title,
    subtitle,
    avatars,
}) => {
    return (
        <div className='lg:ml-50 lg:mr-50 py-2 bg-white border-t-0.5 border-primary border-dotted md:border-dashed flex'>
            <div className='flex flex-col'>
                <div>
                    <CircularProgress percentage={20} />
                </div>
                <div className='flex'>
                    {avatars?.map((avatar, index) => (
                        <div key={index}>
                            <CircularImage
                                src={avatar}
                                alt={`Avatar image ${index}`}
                                diameter={20}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col ml-2 flex-grow h-36'>
                <div className='space-y-1 sm:text-left flex text-left'>
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
            <div className='ml-2 flex items-end h-12 mt-28 max-w-[70px]'>
                <MainButton text='See more' btnGreen={true} />
            </div>
        </div>
    );
};
