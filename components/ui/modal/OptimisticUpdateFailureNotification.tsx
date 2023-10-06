'use client';

import React, { FC } from 'react';
import Notification from './Notification';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';
import { removeError } from '../../../redux/features/deliveries/deliveriesSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const OptimisticUpdateFailureNotification: FC = () => {
    const { error } = useAppSelector(deliveries);

    const dispatch = useAppDispatch();

    const errorWhileSwitchingStatus =
        error && error[0] === 'S'
            ? 'There was an error while switching the worker status'
            : 'There was an error while getting the deliveries';

    const errorWhileDeletingDelivery =
        error && error[0] === 'D'
            ? 'There was an error while deleting the delivery'
            : `${errorWhileSwitchingStatus}`;

    return (
        <Notification
            showModal={true}
            isSuccess={false}
            message={errorWhileDeletingDelivery}
            onClose={() => {
                dispatch(removeError());
            }}
            buttonText={'Ok'}
            singleButton={true}
        />
    );
};

export default OptimisticUpdateFailureNotification;
