'use client';

import React, { FC, useEffect } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DealerCard } from '../../../components/ui/dealerCard/DealerCard';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { workers } from '../../../redux/features/workers/workersSelector';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';
import OptimisticUpdateFailureNotification from '../../../components/ui/modal/OptimisticUpdateFailureNotification';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';
import { getWorkers } from '../../../redux/features/workers/workersThunk';

const DealerPage: FC = () => {
    const { loading, data } = useAppSelector(workers);
    const { error } = useAppSelector(deliveries);
    const selectedDate = useAppSelector(filteredDate);

    const groupSize = 4; // Tamaño de cada grupo de tarjetas
    const totalGroups = Math.ceil(data.length / groupSize);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWorkers(selectedDate));
    }, []);

    return (
        <>
            {error && <OptimisticUpdateFailureNotification />}

            {!data[0].workerName ? (
                <h1>Loading...</h1>
            ) : loading ? (
                <h1>Loading...</h1>
            ) : (
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
                        {Array.from({ length: totalGroups }).map(
                            (_, groupIndex) => (
                                <SwiperSlide key={groupIndex}>
                                    {data
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
                            )
                        )}
                    </Swiper>
                </GeneralCard>
            )}
        </>
    );
};

export default DealerPage;
