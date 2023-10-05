'use client';

import React, { useEffect, useState } from 'react';
import { GeneralCard } from '../generalCard/GeneralCard';
import { DropdownCardFaded } from '../dropdownCard/DropdownCardFaded';
import { DeliveryCardAdmin } from '../deliveryCard/DeliveryCardAdmin';
import { CircularImage } from '../../commons/circular-image/CircularImage';
import { StatusBadge } from '../statusBadge/StatusBadge';
import { Switch } from '../../commons/switch/Switch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
    deleteDeliveries,
    getDeliveries,
    switchWorkerStatus,
} from '../../../redux/features/deliveries/deliveriesThunk';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';
import Notification from '../modal/Notification';
import {
    deleteDeliveredOrderFromReduxState,
    deletePendingOrderFromReduxState,
    removeError,
    switchStatusOptimistic,
} from '../../../redux/features/deliveries/deliveriesSlice';
import ModalDelete from '../../commons/modal/ModalDelete';

interface IndividualWorkerProps {
    individualWorkerDataFromServer: {
        workerId: string;
        status: string;
        urlImage: string;
        deliveredOrders: [{ deliveryId: string; address: string }];
        pendingOrders: [
            { deliveryId: string; address: string; status: string },
        ];
    };
    userId: string;
}

export const IndividualWorker: React.FC<IndividualWorkerProps> = ({
    individualWorkerDataFromServer,
    userId,
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [deletedDeliveryId, setDeletedDeliveryId] = useState('');

    const dispatch = useAppDispatch();

    const handleDeleteClick = async (status: string, deliveryId: string) => {
        setModalMessage('Are you sure you want to delete?');
        setIsModalSuccess(true);
        setShowDeleteModal(true);
        setDeliveryStatus(status);
        setDeletedDeliveryId(deliveryId);
    };

    const handleDeleteConfirm = async () => {
        setShowDeleteModal(false);
        setIsDeleting(true);
        if (deliveryStatus === 'delivered') {
            dispatch(deleteDeliveredOrderFromReduxState(deletedDeliveryId));
            dispatch(deleteDeliveries({ deletedDeliveryId, userId }));
        } else {
            dispatch(deletePendingOrderFromReduxState(deletedDeliveryId));
            dispatch(deleteDeliveries({ deletedDeliveryId, userId }));
        }
        setIsDeleting(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    const handleSwitchClick = async () => {
        setModalMessage('Are you sure you want to switch the worker status?');
        setIsModalSuccess(true);
        setShowSwitchModal(true);
    };

    const handleSwitchConfirm = async () => {
        setShowSwitchModal(false);

        dispatch(switchStatusOptimistic());
        dispatch(switchWorkerStatus(userId));
    };

    const handleSwitchCancel = () => {
        setShowSwitchModal(false);
    };

    const { data, error } = useAppSelector(deliveries);

    useEffect(() => {
        dispatch(getDeliveries(userId));
    }, []);

    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const handleExpand = (cardIndex: number) => {
        if (cardIndex === expandedCard) {
            setExpandedCard(null);
        } else {
            setExpandedCard(cardIndex);
        }
    };

    const serverSideRendering = !data.workerId || data.workerId === '';

    const mapBase = serverSideRendering ? individualWorkerDataFromServer : data;

    const errorWhileSwitchingStatus =
        error && error[0] === 'S'
            ? 'There was an error while switching the worker status'
            : 'There was an error while getting the deliveries';

    const errorWhileDeletingDelivery =
        error && error[0] === 'D'
            ? 'There was an error while deleting the delivery'
            : `${errorWhileSwitchingStatus}`;

    return (
        <>
            {showDeleteModal && (
                <ModalDelete
                    isSuccess={isModalSuccess}
                    message={modalMessage}
                    onClose={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}

            {showSwitchModal && (
                <ModalDelete
                    isSuccess={isModalSuccess}
                    message={modalMessage}
                    onClose={handleSwitchConfirm}
                    onCancel={handleSwitchCancel}
                />
            )}

            {error && (
                <Notification
                    showModal={true}
                    isSuccess={false}
                    message={errorWhileDeletingDelivery}
                    onClose={() => {
                        dispatch(removeError());
                        dispatch(getDeliveries(userId));
                    }}
                    buttonText={'Ok'}
                    singleButton={true}
                />
            )}

            <div className='max-h-screen mb-4'>
                <div className='overflow-auto'>
                    <GeneralCard title={'Worker profile'}>
                        <div className='flex'>
                            <CircularImage
                                src={
                                    !data.workerId || data.workerId === ''
                                        ? individualWorkerDataFromServer.urlImage
                                        : data.urlImage
                                }
                                alt={'Avatar image'}
                                diameter={100}
                            />
                            <div className='flex flex-col ml-2'>
                                <h1 className='text-primary text-2xl font-extrabold'>
                                    {!data.workerId || data.workerId === ''
                                        ? individualWorkerDataFromServer.workerId
                                        : data.workerId}
                                </h1>
                                <div className='mt-2'>
                                    <StatusBadge
                                        status={
                                            !data.workerId ||
                                            data.workerId === ''
                                                ? individualWorkerDataFromServer.status
                                                : data.status
                                        }
                                    />
                                </div>
                            </div>

                            <div className='flex flex-grow items-center justify-end mr-2'>
                                <Switch
                                    initialStatus={
                                        individualWorkerDataFromServer.status
                                    }
                                    workerId={userId}
                                    handleSwitchClick={handleSwitchClick}
                                />
                            </div>
                        </div>
                    </GeneralCard>
                    <div className='mt-4'>
                        <DropdownCardFaded
                            title='Pending deliveries'
                            subtitle={
                                !data.workerId || data.workerId === ''
                                    ? `${individualWorkerDataFromServer.pendingOrders.length} pending`
                                    : `${data.pendingOrders.length} pending`
                            }
                            expanded={expandedCard === 1}
                            onExpand={() => handleExpand(1)}
                        >
                            {mapBase.pendingOrders.map((delivery) => (
                                <DeliveryCardAdmin
                                    key={delivery.deliveryId}
                                    deliveryID={delivery.deliveryId}
                                    deliveryAddress={delivery.address}
                                    status={delivery.status}
                                    showCancel={true}
                                    isDeleting={isDeleting}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            ))}
                        </DropdownCardFaded>

                        <DropdownCardFaded
                            title='Delivery history'
                            subtitle={
                                !data.workerId || data.workerId === ''
                                    ? `${individualWorkerDataFromServer.deliveredOrders.length} delivered`
                                    : `${data.deliveredOrders.length} delivered`
                            }
                            expanded={expandedCard === 2}
                            onExpand={() => handleExpand(2)}
                        >
                            {mapBase.deliveredOrders.map((delivery) => (
                                <DeliveryCardAdmin
                                    key={delivery.deliveryId}
                                    deliveryID={delivery.deliveryId}
                                    deliveryAddress={delivery.address}
                                    status='delivered'
                                    showCancel={true}
                                    isDeleting={isDeleting}
                                    handleDeleteClick={handleDeleteClick}
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
export default IndividualWorker;
