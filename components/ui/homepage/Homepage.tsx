'use client';

import React, { useRef, useEffect } from 'react';
import { GeneralCard } from '../generalCard/GeneralCard';
import { AdminDetailsCard } from '../adminDetailsCard/AdminDetailsCard';
import { CircularImage } from '../../commons/circular-image/CircularImage';
import { SliderDateBox } from '../../commons/slider-date-box/SliderDateBox';
import { ArrowsSliderDate } from '../../commons/SVG/ArrowsSliderDate';
import { DateDropdownCard } from '../dateDropdownCard/DateDropdownCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';
import { adminUser } from '../../../redux/features/user/userSelector';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setFilteredDate } from '../../../redux/features/filtered-date/filteredDateSlice';
import { getDailyMetrics } from '../../../redux/features/daily-metrics/dailyMetricsThunk';
import { dailyMetrics } from '../../../redux/features/daily-metrics/dailyMetricsSelector';
import { getWorkers } from '../../../redux/features/workers/workersThunk';
import { IDailyMetrics } from '../../../interfaces';
import { dateFormatting } from 'utils';

interface HomepageProps {
    dailyMetricsFromServer: IDailyMetrics;
}

export const Homepage: React.FC<HomepageProps> = ({
    dailyMetricsFromServer,
}) => {
    const selectedDate = useAppSelector(filteredDate);
    const adminUserData = useAppSelector(adminUser);
    const { data, loading } = useAppSelector(dailyMetrics);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDailyMetrics(selectedDate));
        dispatch(getWorkers(selectedDate));
    }, [selectedDate]);

    const swiperRef = useRef<SwiperInstance | null>(null);

    type SwiperInstance = {
        slidePrev: () => void;
        slideNext: () => void;
    };

    //Dates logic for Date Dropdown and Swiper

    const handleClick = async (index: number) => {
        const today = new Date();
        today.setDate(today.getDate() + index - 30);

        const dateMerge = dateFormatting(today);

        dispatch(setFilteredDate(dateMerge));
    };

    const daysOfTheWeek: Array<string> = [];
    const dayNumbers: Array<number> = [];

    for (let i = -30; i <= 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        daysOfTheWeek.push(date.toString().substring(0, 3));
        dayNumbers.push(date.getDate());
    }

    const avatarArray = [''];
    // const avatarArray = data.activeWorkers.images.map(
    //     (image) => image.urlImage
    // );

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
                    {loading ? (
                        <div className='text-primary font-extrabold'>
                            Loading...
                        </div>
                    ) : (
                        <>
                            {data.availableWorkers === 0 ? (
                                <>
                                    <AdminDetailsCard
                                        title='Delivery Staff'
                                        subtitle={`${dailyMetricsFromServer.activeWorkers.total}/${dailyMetricsFromServer.availableWorkers} active`}
                                        avatars={avatarArray}
                                        number1={
                                            dailyMetricsFromServer.activeWorkers
                                                .total
                                        }
                                        number2={
                                            dailyMetricsFromServer.availableWorkers
                                        }
                                    />
                                    <AdminDetailsCard
                                        title='Packages'
                                        subtitle={`${dailyMetricsFromServer.deliveredOrders}/${dailyMetricsFromServer.availableOrders} delivered`}
                                        number1={
                                            dailyMetricsFromServer.deliveredOrders
                                        }
                                        number2={
                                            dailyMetricsFromServer.availableOrders
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <AdminDetailsCard
                                        title='Delivery Staff'
                                        subtitle={`${data.activeWorkers.total}/${data.availableWorkers} active`}
                                        avatars={avatarArray}
                                        number1={data.activeWorkers.total}
                                        number2={data.availableWorkers}
                                    />
                                    <AdminDetailsCard
                                        title='Packages'
                                        subtitle={`${data.deliveredOrders}/${data.availableOrders} delivered`}
                                        number1={data.deliveredOrders}
                                        number2={data.availableOrders}
                                    />
                                </>
                            )}
                        </>
                    )}

                    <div className='flex justify-center absolute right-12 top-3'>
                        <DateDropdownCard
                            startDate={selectedDate}
                            setDate={(date: string | undefined) => {
                                dispatch(setFilteredDate(date));
                            }}
                        />
                    </div>
                </div>
            </GeneralCard>
        </>
    );
};
