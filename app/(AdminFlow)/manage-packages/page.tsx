'use client';
import React, { FC, useEffect, useState } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DeliveryCard } from '../../../components/ui/deliveryCard/DeliveryCard';
import { AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

interface Order {
    _id: string;
    address: string;
    status: string;
    recipient: string;
    weigth: number;
}

const InitWorkDay: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (pageNumber: number = currentPage + 1) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/?page=${pageNumber}&deliveryDate=2023-09-29`
            );
            setOrders(response.data.data);
            setPageCount(response.data.totalPages);
            setCurrentPage(response.data.page - 1);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const onDeleteSuccess = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/?deliveryDate=2023-09-29`
            );
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error updating orders after deletion:', error);
        }
    };

    const handlePageClick = (data: { selected: number }) => {
        const pageNumber = data.selected + 1;
        fetchOrders(pageNumber);
    };

    return (
        <div
            className='rounded-xl relative'
            style={{
                height: '750px',
                overflowY: 'scroll',
                borderRadius: '0 0 20px 20px',
            }}
        >
            <GeneralCard title='Packages'>
                <div>
                    <p className='text-primary font-bold mb-3.5'>
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

                <div className='flex justify-center mt-4'>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName='flex'
                        pageLinkClassName='mx-2 p-2 bg-gray-200 rounded'
                        previousLinkClassName='mx-2 p-2 bg-gray-200 rounded'
                        nextLinkClassName='mx-2 p-2 bg-gray-200 rounded'
                        activeClassName='bg-blue-500 text-white'
                    />
                </div>

                <div className='flex'>
                    <div className='ml-auto px-1 py-5 '>
                        <button
                            onClick={() => router.push('/add-package')}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <AiFillPlusCircle size={50} color='#80ED99' />
                        </button>
                    </div>
                </div>
            </GeneralCard>
        </div>
    );
};

export default InitWorkDay;
