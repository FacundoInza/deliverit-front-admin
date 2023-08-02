'use client';

import React, { FC, useState, useRef } from 'react';
import { DeliveryCard } from '@components/ui/deliveryCard/DeliveryCard';
import { DropdownCard } from '@components/ui/dropdownCard/DropdownCard';
import { SliderDateBox } from '@components/commons/slider-date-box/SliderDateBox';
import MainButton from '@components/commons/buttons/MainButton';
import { ArrowsSliderDate } from '@components/commons/SVG/ArrowsSliderDate';
import { DateDropdownCard } from '@components/ui/dateDropdownCard/DateDropdownCard';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Admin: FC = () => {
    const dummyData = [
        {
            deliveryID: '#02A35',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'pending',
        },
        {
            deliveryID: '#02A36',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'in progress',
        },
        {
            deliveryID: '#02A37',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'inactive',
        },
        {
            deliveryID: '#02A38',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'delivered',
        },
    ];

    type SwiperInstance = {
        slidePrev: () => void;
        slideNext: () => void;
    };

    const swiperRef = useRef<SwiperInstance | null>(null);

    const [initialStartDate, setInitialStartDate] = useState(new Date());

    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const handleExpand = (cardIndex: number) => {
        if (cardIndex === expandedCard) {
            setExpandedCard(null);
        } else {
            setExpandedCard(cardIndex);
        }
    };

    const handleClick = (index: number) => {
        console.log(index);

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
            <DropdownCard
                title='Pending deliveries'
                subtitle='3 pending'
                expanded={expandedCard === 1}
                onExpand={() => handleExpand(1)}
            >
                {dummyData
                    .filter((delivery) => delivery.status !== 'delivered')
                    .map((delivery) => (
                        <DeliveryCard
                            key={delivery.deliveryID}
                            deliveryID={delivery.deliveryID}
                            deliveryAddress={delivery.deliveryAddress}
                            status={delivery.status}
                            showCancel={true}
                        />
                    ))}
            </DropdownCard>

            <DropdownCard
                title='Delivery history'
                subtitle='1 delivered'
                expanded={expandedCard === 2}
                onExpand={() => handleExpand(2)}
            >
                {dummyData
                    .filter((delivery) => delivery.status === 'delivered')
                    .map((delivery) => (
                        <DeliveryCard
                            key={delivery.deliveryID}
                            deliveryID={delivery.deliveryID}
                            deliveryAddress={delivery.deliveryAddress}
                            status='delivered'
                            showCancel={false}
                        />
                    ))}
            </DropdownCard>

            <Link href='/packages'>
                <div className='flex justify-center mt-4 w-72 mx-auto'>
                    <MainButton text={'Get packages'} btnGreen={true} />
                </div>
            </Link>

            <div className='relative xl:mx-[600px] md:mx-[200px]'>
                <div
                    className='h-8 w-8 text-white rotate-180 absolute left-0 top-4'
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ArrowsSliderDate />
                </div>

                <div className='swiper-container ml-10 mr-8 lg:ml-24'>
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
            <div className='flex justify-center mt-8 mx-8'>
                <DateDropdownCard startDate={initialStartDate} />
            </div>
        </>
    );
};
export default Admin;
