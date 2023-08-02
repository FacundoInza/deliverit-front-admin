import React, { FC, ReactNode, useState } from 'react';

interface Props {
    icon: ReactNode;
    handleClick: () => void;
}

export const IconButton: FC<Props> = ({ icon, handleClick }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClickWithEffect = () => {
        setIsClicked(true);
        handleClick();

        // Después de 300ms (puedes ajustar este valor si lo deseas),
        // establecemos el estado nuevamente a falso para que vuelva a la escala 1
        setTimeout(() => {
            setIsClicked(false);
        }, 150);
    };

    return (
        <span
            className={`text-indigo-600 text-lg ${
                isClicked ? 'scale-110' : 'scale-1'
            }`}
            onClick={() => handleClickWithEffect()}
        >
            {icon}
        </span>
    );
};
