'use client';

import React, { FC } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DealerCard } from '../../../components/ui/dealerCard/DealerCard';
import { useAppSelector } from '../../../hooks/useAppSelector';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

const DealerPage: FC = () => {
    const { allDealers } = useAppSelector((state) => state.dealers);

    const groupSize = 4; // Tamaño de cada grupo de tarjetas
    const totalGroups = Math.ceil(allDealers.length / groupSize);

    return (
        <GeneralCard title='Workers'>
            <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                spaceBetween={120}
                pagination={{
                    clickable: true,
                }}
                className='mb-12 mt-12'
            >
                {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                    <SwiperSlide key={groupIndex}>
                        {allDealers
                            .slice(
                                groupIndex * groupSize,
                                (groupIndex + 1) * groupSize
                            )
                            .map((dealer, subIndex) => (
                                // Change href Link when dinamic routes are ready

                                <Link href='/admin/workers' key={groupIndex}>
                                    <DealerCard
                                        dealer={dealer}
                                        key={subIndex}
                                    />{' '}
                                </Link>
                            ))}
                    </SwiperSlide>
                ))}
            </Swiper>
        </GeneralCard>
    );
};

export default DealerPage;
