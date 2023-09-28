'use client';

import React, { useState } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DropdownCardFaded } from '../../../components/ui/dropdownCard/DropdownCardFaded';
import { DeliveryCard } from '../../../components/ui/deliveryCard/DeliveryCard';
import { CircularImage } from '../../../components/commons/circular-image/CircularImage';
import { StatusBadge } from '../../../components/ui/statusBadge/StatusBadge';
import { Switch } from '../../../components/commons/switch/Switch';

interface IndividualWorkerProps {
    individualWorkerDataFromServer: {
        workerId: '';
        status: '';
        workerImage: '';
        deliveredOrders: [{ orderId: ''; address: '' }];
        pendingOrders: [{ orderId: ''; address: ''; status: '' }];
    };
}

export const IndividualWorker: React.FC<IndividualWorkerProps> = ({
    individualWorkerDataFromServer,
}) => {
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
                                src={individualWorkerDataFromServer.workerImage}
                                alt={'Avatar image'}
                                diameter={100}
                            />
                            <div className='flex flex-col ml-2'>
                                <h1 className='text-primary text-2xl font-extrabold'>
                                    {individualWorkerDataFromServer.workerId}
                                </h1>
                                <div className='mt-2'>
                                    <StatusBadge
                                        status={
                                            individualWorkerDataFromServer.status
                                        }
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
                            subtitle={`${individualWorkerDataFromServer.pendingOrders.length} pending`}
                            expanded={expandedCard === 1}
                            onExpand={() => handleExpand(1)}
                        >
                            {individualWorkerDataFromServer.pendingOrders.map(
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
                            subtitle={`${individualWorkerDataFromServer.deliveredOrders.length} delivered`}
                            expanded={expandedCard === 2}
                            onExpand={() => handleExpand(2)}
                        >
                            {individualWorkerDataFromServer.deliveredOrders.map(
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
export default IndividualWorker;
