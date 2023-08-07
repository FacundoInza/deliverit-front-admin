import React, { FC } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DeliveryCard } from '../../../components/ui/deliveryCard/DeliveryCard';
import { AiFillPlusCircle } from 'react-icons/ai';
import Link from 'next/link';

const InitWorkDay: FC = () => {
    const dummyData = [
        {
            deliveryID: '#02A35',
            deliveryAddress: 'Castillo 1356, CABA',
            status: 'pending',
        },
        {
            deliveryID: '#0H167',
            deliveryAddress: 'Av. Carabobo y Rivadavia, CABA',
            status: 'in progress',
        },
        {
            deliveryID: '#0H166',
            deliveryAddress: 'Mendoza 1810, CABA',
            status: 'inactive',
        },
        {
            deliveryID: '#0B540',
            deliveryAddress: 'Scalabrini Ortiz 5073, CABA',
            status: 'delivered',
        },
        {
            deliveryID: '#0V768',
            deliveryAddress: 'Pensamientos 2673, CABA',
            status: 'pending',
        },
        /* {
            deliveryID: '#0Z395',
            deliveryAddress: 'Av. Acoyte 2907, CABA',
            status: 'in progress',
        },
                {
            deliveryID: '#0D832',
            deliveryAddress: 'Libertador 1302, CABA',
            status: 'inactive',
        },
                {
            deliveryID: '#0N510',
            deliveryAddress: 'Lavalleja 2174, CABA',
            status: 'delivered',
        }, */
    ];

    return (
        <div
            className=' rounded-xl relative'
            style={{
                height: '750px',
                overflowY: 'scroll',
                borderRadius: '0 0 20px 20px',
            }}
        >
            <GeneralCard title='Packages'>
                <div>
                    <p className='text-primary font-bold mb-3.5'>
                        {' '}
                        523 paquetes
                    </p>
                </div>

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
                <div className='flex'>
                    <div className='ml-auto  px-1 py-5 '>
                        <Link href='/add-package'>
                            <AiFillPlusCircle size={50} color='#80ED99' />
                        </Link>
                    </div>
                </div>
                {/* </div> */}
            </GeneralCard>
        </div>
    );
};

export default InitWorkDay;
