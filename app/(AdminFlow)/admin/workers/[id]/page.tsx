'use client';

import React, { FC, useState, useEffect } from 'react';
import { GeneralCard } from '@components/ui/generalCard/GeneralCard';
import { DropdownCardFaded } from '@components/ui/dropdownCard/DropdownCardFaded';
import { DeliveryCard } from '@components/ui/deliveryCard/DeliveryCard';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import { StatusBadge } from '@components/ui/statusBadge/StatusBadge';
import { Switch } from '@components/commons/switch/Switch';
import { getDeliveries } from '../../../../../redux/features/deliveries/deliveriesSelector';
import { setDeliveries } from '../../../../../redux/features/deliveries/deliveriesSlice';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import axios from 'axios';

interface IndividualWorkerProps {
    params: {
        id: string;
    };
}

const Workers: FC<IndividualWorkerProps> = ({ params }) => {
    const filteredDeliveries = useAppSelector(getDeliveries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/admin/workers/${params.id}`
            );

            dispatch(setDeliveries(data.data));
        };

        fetchData();
    }, []);

    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const handleExpand = (cardIndex: number) => {
        if (cardIndex === expandedCard) {
            setExpandedCard(null);
        } else {
            setExpandedCard(cardIndex);
        }
    };

    return (
        <>
            <div className='max-h-screen mb-4'>
                <div className='overflow-auto'>
                    <GeneralCard title={'Worker profile'}>
                        <div className='flex'>
                            <CircularImage
                                src={filteredDeliveries.urlImage}
                                alt={'Avatar image'}
                                diameter={100}
                            />
                            <div className='flex flex-col ml-2'>
                                <h1 className='text-primary text-2xl font-extrabold'>
                                    {filteredDeliveries.workerId}
                                </h1>
                                <div className='mt-2'>
                                    <StatusBadge
                                        status={filteredDeliveries.status}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-grow items-center justify-end mr-2'>
                                <Switch />
                            </div>
                        </div>
                    </GeneralCard>
                    <div className='mt-4'>
                        <DropdownCardFaded
                            title='Pending deliveries'
                            subtitle={`${filteredDeliveries.pendingOrders.length} pending`}
                            expanded={expandedCard === 1}
                            onExpand={() => handleExpand(1)}
                        >
                            {filteredDeliveries.pendingOrders.map(
                                (delivery) => (
                                    <DeliveryCard
                                        key={delivery.orderId}
                                        deliveryID={delivery.orderId}
                                        deliveryAddress={delivery.address}
                                        status='pending'
                                        showCancel={true}
                                    />
                                )
                            )}
                        </DropdownCardFaded>

                        <DropdownCardFaded
                            title='Delivery history'
                            subtitle={`${filteredDeliveries.deliveredOrders.length} delivered`}
                            expanded={expandedCard === 2}
                            onExpand={() => handleExpand(2)}
                        >
                            {filteredDeliveries.deliveredOrders.map(
                                (delivery) => (
                                    <DeliveryCard
                                        key={delivery.orderId}
                                        deliveryID={delivery.orderId}
                                        deliveryAddress={delivery.address}
                                        status='delivered'
                                        showCancel={true}
                                    />
                                )
                            )}
                        </DropdownCardFaded>
                    </div>
                </div>
            </div>

            <div className='bg-primary h-8 w-screen fixed bottom-0 left-0'></div>
        </>
    );
};
export default Workers;
