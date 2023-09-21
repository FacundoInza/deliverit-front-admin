'use client';

import React, { FC, useState, useRef, useEffect } from 'react';
import { GeneralCard } from '@components/ui/generalCard/GeneralCard';
import { AdminDetailsCard } from '@components/ui/adminDetailsCard/AdminDetailsCard';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import { SliderDateBox } from '@components/commons/slider-date-box/SliderDateBox';
import { ArrowsSliderDate } from '@components/commons/SVG/ArrowsSliderDate';
import { DateDropdownCard } from '@components/ui/dateDropdownCard/DateDropdownCard';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';
import { adminUser } from '../../../redux/features/user/userSelector';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setFilteredDate } from '../../../redux/features/filtered-date/filteredDateSlice';

const Admin: FC = () => {
    const selectedDate = useAppSelector(filteredDate);
    const adminUserData = useAppSelector(adminUser);
    const dispatch = useAppDispatch();

    const [dailyMetrics, setDailyMetrics] = useState({
        availableOrders: 0,
        deliveredOrders: 0,
        availableWorkers: 0,
        activeWorkers: { total: 0, images: [{ id: '', urlImage: '' }] },
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                `http://a8b1f6e8fb7484604a10364720068c8c-beca9df5ac25d9fe.elb.sa-east-1.amazonaws.com/api/admin/${selectedDate.toISOString()}`
            );
            setDailyMetrics({
                availableOrders: data.data.availableOrders,
                deliveredOrders: data.data.deliveredOrders,
                availableWorkers: data.data.availableWorkers,
                activeWorkers: data.data.activeWorkers,
            });
        };

        fetchData();
    }, [selectedDate]);

    const swiperRef = useRef<SwiperInstance | null>(null);

    type SwiperInstance = {
        slidePrev: () => void;
        slideNext: () => void;
    };

    //Dates logic for Date Dropdown and Swiper

    const handleClick = (index: number) => {
        const today = new Date();
        today.setDate(today.getDate() + index - 30);
        dispatch(setFilteredDate(today));
    };

    const daysOfTheWeek: Array<string> = [];
    const dayNumbers: Array<number> = [];

    for (let i = -30; i <= 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        daysOfTheWeek.push(date.toString().substring(0, 3));
        dayNumbers.push(date.getDate());
    }

    //const avatarArray = [avatarImage, avatarImage];

    const avatarArray = dailyMetrics.activeWorkers.images.map(
        (image) => image.urlImage
    );

    return (
        <>
            <GeneralCard title={'Delivery Management'}>
                <div className='flex justify-center'>
                    <CircularImage
                        src={adminUserData.urlImage}
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
                        subtitle={`${dailyMetrics.activeWorkers}/${dailyMetrics.availableWorkers} active`}
                        avatars={avatarArray}
                        number1={dailyMetrics.activeWorkers.total}
                        number2={dailyMetrics.availableWorkers}
                    />
                    <AdminDetailsCard
                        title='Packages'
                        subtitle={`${dailyMetrics.deliveredOrders}/${dailyMetrics.availableOrders} delivered`}
                        number1={dailyMetrics.deliveredOrders}
                        number2={dailyMetrics.availableOrders}
                    />

                    <div className='flex justify-center absolute right-12 top-3'>
                        <DateDropdownCard
                            startDate={selectedDate}
                            setDate={(date: Date) =>
                                dispatch(setFilteredDate(date))
                            }
                        />
                    </div>
                </div>
            </GeneralCard>
        </>
    );
};
export default Admin;
