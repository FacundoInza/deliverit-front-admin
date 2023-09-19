'use client';

import React, { FC, useEffect } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DealerCard } from '../../../components/ui/dealerCard/DealerCard';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';
import { getWorkers } from '../../../redux/features/workers/workersSelector';
import { setWorkers } from '../../../redux/features/workers/workersSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import axios from 'axios';

const DealerPage: FC = () => {
    const selectedDate = useAppSelector(filteredDate);
    const filteredWorkers = useAppSelector(getWorkers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/admin/${selectedDate.toISOString()}/workers`
            );

            dispatch(setWorkers(data.data));
        };

        fetchData();
    }, [selectedDate]);

    const groupSize = 4; // Tamaño de cada grupo de tarjetas
    const totalGroups = Math.ceil(filteredWorkers.length / groupSize);

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
                        {filteredWorkers
                            .slice(
                                groupIndex * groupSize,
                                (groupIndex + 1) * groupSize
                            )
                            .map((dealer, subIndex) => (
                                // Change href Link when dinamic routes are ready

                                <Link
                                    href={`/admin/workers/${dealer.workerId}`}
                                    key={groupIndex}
                                >
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
