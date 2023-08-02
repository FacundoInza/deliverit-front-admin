import React, { FC } from 'react';

//commons
import { ItemQuantity } from '../../commons/item-quantity';
import { ItemCheckbox } from '../../commons/checkbox';

//Hooks
import { useAppDispatch } from '../../../hooks/useAppDispatch';

//Actions
import {
    decreaseQuantity,
    increaseQuantity,
} from 'redux/features/packages/packagesSlice';

//interfaces
import { IPackage } from '../../../interfaces/IPackage';

interface Props {
    pack: IPackage;
}

export const SelectPackages: FC<Props> = ({ pack }) => {
    const dispatch = useAppDispatch();

    const handleMinusQuantity = () => {
        dispatch(decreaseQuantity({ id: pack.id }));
    };

    const handlePlusQuantity = () => {
        dispatch(increaseQuantity({ id: pack.id }));
    };

    return (
        <div className='flex items-center border-0.5 border-primary rounded-custom-10 w-full h-14 p-3 mt-3'>
            <ItemCheckbox
                address={pack.address}
                city={pack.city}
                available={pack.available}
            />
            <ItemQuantity
                quantity={pack.quantity}
                handleMinusQuantity={handleMinusQuantity}
                handlePlusQuantity={handlePlusQuantity}
            />
        </div>
    );
};
