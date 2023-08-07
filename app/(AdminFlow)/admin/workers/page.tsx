'use client';

import React, { FC, useState } from 'react';
import { GeneralCard } from '@components/ui/generalCard/GeneralCard';
import { DropdownCardFaded } from '@components/ui/dropdownCard/DropdownCardFaded';
import { DeliveryCard } from '@components/ui/deliveryCard/DeliveryCard';
import { CircularImage } from '@components/commons/circular-image/CircularImage';
import { StatusBadge } from '@components/ui/statusBadge/StatusBadge';
import { Switch } from '@components/commons/switch/Switch';
import avatarImage from '@components/commons/circular-image/imagen.png';

const Workers: FC = () => {
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
        {
            deliveryID: '#02A39',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'pending',
        },
        {
            deliveryID: '#02A40',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'in progress',
        },
        {
            deliveryID: '#02A41',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'inactive',
        },
        {
            deliveryID: '#02A42',
            deliveryAddress: 'Amenabar 2356, CABA',
            status: 'delivered',
        },
    ];

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
                                src={avatarImage}
                                alt={'Avatar image'}
                                diameter={100}
                            />
                            <div className='flex flex-col ml-2'>
                                <h1 className='text-primary text-2xl font-extrabold'>
                                    Worker name{' '}
                                </h1>
                                <div className='mt-2'>
                                    <StatusBadge status={'active'} />
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
                            subtitle='3 pending'
                            expanded={expandedCard === 1}
                            onExpand={() => handleExpand(1)}
                        >
                            {dummyData
                                .filter(
                                    (delivery) =>
                                        delivery.status !== 'delivered'
                                )
                                .map((delivery) => (
                                    <DeliveryCard
                                        key={delivery.deliveryID}
                                        deliveryID={delivery.deliveryID}
                                        deliveryAddress={
                                            delivery.deliveryAddress
                                        }
                                        status={delivery.status}
                                        showCancel={true}
                                    />
                                ))}
                        </DropdownCardFaded>

                        <DropdownCardFaded
                            title='Delivery history'
                            subtitle='1 delivered'
                            expanded={expandedCard === 2}
                            onExpand={() => handleExpand(2)}
                        >
                            {dummyData
                                .filter(
                                    (delivery) =>
                                        delivery.status === 'delivered'
                                )
                                .map((delivery) => (
                                    <DeliveryCard
                                        key={delivery.deliveryID}
                                        deliveryID={delivery.deliveryID}
                                        deliveryAddress={
                                            delivery.deliveryAddress
                                        }
                                        status='delivered'
                                        showCancel={true}
                                    />
                                ))}
                        </DropdownCardFaded>
                    </div>
                </div>
            </div>

            <div className='bg-primary h-8 w-screen fixed bottom-0 left-0'></div>
        </>
    );
};
export default Workers;
