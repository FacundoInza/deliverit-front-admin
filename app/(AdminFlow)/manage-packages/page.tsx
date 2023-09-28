'use client';
import React, { FC, useEffect, useState } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DeliveryCard } from '../../../components/ui/deliveryCard/DeliveryCard';
import { AiFillPlusCircle } from 'react-icons/ai';
import Link from 'next/link';
import axios from 'axios';

interface Order {
    /* deliveryID: string; */
    _id: string;
    address: string;
    status: string;
    recipient: string;
    weigth: number;
}

const InitWorkDay: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/`
            );
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const onDeleteSuccess = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/`
            );
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error updating orders after deletion:', error);
        }
    };

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
                        {/* 523 paquetes */}
                        {orders.length} paquetes
                    </p>
                </div>

                {orders
                    .filter((delivery) => delivery.status !== 'delivered')
                    .map((delivery) => (
                        <DeliveryCard
                            key={delivery._id}
                            deliveryID={delivery._id}
                            deliveryAddress={delivery.address}
                            status={delivery.status}
                            showCancel={true}
                            recipient={delivery.recipient}
                            onDeleteSuccess={onDeleteSuccess}
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
