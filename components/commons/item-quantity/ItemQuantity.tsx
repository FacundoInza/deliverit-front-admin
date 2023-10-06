import React, { FC } from 'react';
import { IconButton } from '../buttons';
import { IconMinusSvg, IconPlusSvg } from '../SVG';

interface Props {
    packagesQuantity: number;
    handlePlusQuantity: () => void;
    handleMinusQuantity: () => void;
}

export const ItemQuantity: FC<Props> = ({
    packagesQuantity,
    handleMinusQuantity,
    handlePlusQuantity,
}) => {
    return (
        <div className='flex items-center border-0.5 border-primary w-24 h-8 rounded-xl p-2'>
            <IconButton
                icon={<IconMinusSvg />}
                handleClick={handleMinusQuantity}
            />
            <span className='text-lg text-primary ml-1 mr-1 w-full'>
                {packagesQuantity.toString().padStart(2, '0')}
            </span>
            <IconButton
                icon={<IconPlusSvg />}
                handleClick={handlePlusQuantity}
            />
        </div>
    );
};

// import React, { FC } from 'react';
// import { IconButton } from '../buttons';
// import { IconMinusSvg, IconPlusSvg } from '../SVG';

// interface Props {
//     quantity: number;
//     handlePlusQuantity: () => void;
//     handleMinusQuantity: () => void;
// }

// export const ItemQuantity: FC<Props> = ({
//     quantity,
//     handleMinusQuantity,
//     handlePlusQuantity,
// }) => {
//     return (
//         <div className='flex items-center border-0.5 border-primary w-24 h-8 rounded-xl p-2'>
//             <IconButton
//                 icon={<IconMinusSvg />}
//                 handleClick={handleMinusQuantity}
//             />
//             <span className='text-lg text-primary ml-1 mr-1 w-full'>
//                 {quantity}
//             </span>
//             <IconButton
//                 icon={<IconPlusSvg />}
//                 handleClick={handlePlusQuantity}
//             />
//         </div>
//     );
// };
