'use client';

import React, { FC, useState, useRef } from 'react';
import { GeneralCard } from '@components/ui/generalCard/GeneralCard';
import { AdminDetailsCard } from '@components/ui/adminDetailsCard/AdminDetailsCard';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import avatarImage from '@components/commons/circular-image/imagen.png';
import { SliderDateBox } from '@components/commons/slider-date-box/SliderDateBox';
import { ArrowsSliderDate } from '@components/commons/SVG/ArrowsSliderDate';
import { DateDropdownCard } from '@components/ui/dateDropdownCard/DateDropdownCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Admin: FC = () => {
    const [initialStartDate, setInitialStartDate] = useState(new Date());

    const swiperRef = useRef<SwiperInstance | null>(null);

    type SwiperInstance = {
        slidePrev: () => void;
        slideNext: () => void;
    };

    //Dates logic for Date Dropdown and Swiper

    const handleClick = (index: number) => {
        const today = new Date();
        today.setDate(today.getDate() + index - 30);
        setInitialStartDate(today);
    };

    const daysOfTheWeek: Array<string> = [];
    const dayNumbers: Array<number> = [];

    for (let i = -30; i <= 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        daysOfTheWeek.push(date.toString().substring(0, 3));
        dayNumbers.push(date.getDate());
    }

    return (
        <>
            <GeneralCard title={'Delivery Management'}>
                <div className='flex justify-center'>
                    <CircularImage
                        src={avatarImage}
                        alt={'Avatar image'}
                        diameter={57}
                    />
                    <div className='flex flex-col ml-2'>
                        <p className='text-primary font-extrabold'>
                            Hello Admin!
                        </p>
                        <p className='text-primary'>
                            These are the deliveries of the day.
                        </p>
                    </div>
                </div>

                <div className='relative xl:mx-[300px] lg:mx-[50px] md:mx-[200px] sm:mx-[50px] my-8'>
                    <div
                        className='h-8 w-8 text-white rotate-180 absolute left-0 top-4'
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ArrowsSliderDate />
                    </div>

                    <div className='swiper-container ml-8 mr-8 lg:ml-10 xl:ml-12'>
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={5}
                            className='mt-4 mx-auto'
                            initialSlide={28}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {daysOfTheWeek &&
                                daysOfTheWeek.map((dayOfTheWeek, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <SliderDateBox
                                                dayOfTheWeek={dayOfTheWeek}
                                                dayNumber={dayNumbers[index]}
                                                highlighted={
                                                    index === 30 ? true : false
                                                }
                                                dateSelectionFunction={() =>
                                                    handleClick(index)
                                                }
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>

                    <div
                        className='h-8 w-8 text-white absolute right-0 top-4'
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ArrowsSliderDate />
                    </div>
                </div>

                <div className='relative border-0.5 border-primary rounded-xl mt-2 ml-2 mr-2 py-2 px-4'>
                    <p className='text-primary font-extrabold my-2'>Details</p>
                    <AdminDetailsCard
                        title='Delivery Staff'
                        subtitle='2/10 active'
                    />
                    <AdminDetailsCard
                        title='Packages'
                        subtitle='16/20 delivered'
                    />
                    <div className='flex justify-center absolute right-12 top-2'>
                        <DateDropdownCard startDate={initialStartDate} />
                    </div>
                </div>
            </GeneralCard>
        </>
    );
};
export default Admin;
