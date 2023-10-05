'use client';
import React, { FC, useEffect, useState } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DeliveryCard } from '../../../components/ui/deliveryCard/DeliveryCard';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';
import { selectOrders } from '../../../redux/features/orders/ordersSelector';
import OptimisticUpdateFailureNotification from '../../../components/ui/modal/OptimisticUpdateFailureNotification';
import { IOrder } from '../../../redux/features/orders/ordersSlice';
import { getOrders } from '../../../redux/features/orders/ordersThunk';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { api } from '../../../api/axiosInstance';

const InitWorkDay: FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const { error } = useAppSelector(deliveries);
    const { loading, data } = useAppSelector(selectOrders);
    const selectedDate = useAppSelector(filteredDate);
    useEffect(() => {
        setOrders(data.data);
        setPageCount(data.totalPages);
        setCurrentPage(Number(data.page) - 1);
    }, [data]);

    const onDeleteSuccess = async (pageNumber: number = currentPage + 1) => {
        try {
            const response = await api.get(
                `/api/order/?page=${pageNumber}&deliveryDate=${selectedDate}`
            );
            setOrders(response.data.data);
            if (response.data.data.length === 0 && pageNumber > 1) {
                pageNumber = pageNumber - 1;
                dispatch(
                    getOrders({
                        pageNumber: pageNumber,
                        selectedDate: selectedDate,
                    })
                );
            }
        } catch (error) {
            console.error('Error updating orders after deletion:', error);
        }
    };

    const handlePageClick = (data: { selected: number }) => {
        const pageNumber = data.selected + 1;
        dispatch(
            getOrders({ pageNumber: pageNumber, selectedDate: selectedDate })
        );
    };

    return (
        <>
            {error && <OptimisticUpdateFailureNotification />}

            <div
                className='rounded-xl relative'
                style={{
                    height: '750px',
                    overflowY: 'scroll',
                    borderRadius: '0 0 20px 20px',
                }}
            >
                <GeneralCard title='Orders'>
                    <div>
                        <p className='text-primary font-bold mb-3.5'>
                            {orders.length} orders
                        </p>
                    </div>
                    {loading ? (
                        <div className='text-primary font-extrabold'>
                            Loading...
                        </div>
                    ) : (
                        orders
                            .filter(
                                (delivery) => delivery.status !== 'delivered'
                            )
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
                            ))
                    )}

                    <div className='flex justify-center mt-4'>
                        <ReactPaginate
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName='flex'
                            pageLinkClassName='mx-2 p-2 bg-gray-200 rounded'
                            previousLinkClassName='mx-2 p-2 bg-white-200 rounded'
                            nextLinkClassName='mx-2 p-2 bg-white-200 rounded'
                            previousLabel={<span>&lt;</span>}
                            nextLabel={<span>&gt;</span>}
                            activeClassName={'active'}
                            pageClassName={'bg-white'}
                        />
                    </div>

                    <div className='flex'>
                        <div className='ml-auto px-1 py-5 '>
                            <button
                                onClick={() =>
                                    router.push('/admin/add-package')
                                }
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
        </>
    );
};

export default InitWorkDay;