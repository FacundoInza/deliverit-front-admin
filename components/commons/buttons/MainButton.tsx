'use client';
import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    btnGreen?: boolean;
    btnBlue?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
    text,
    onClick,
    btnGreen,
    btnBlue,
}) => {
    const buttonClasses = classNames(
        'text-info',
        'h-7.5',
        'w-full',
        'p-2',
        'rounded-full',
        'font-feature-settings: "clig" off, "liga" off',
        'text-sm',
        'font-bold',
        'leading-6',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'self-stretch',
        {
            'text-primary': btnGreen,
            'bg-secondary': btnGreen,
            'hover:bg-primary': btnGreen,
            'hover:text-info': btnGreen,
            'hover:border': btnGreen,
            'hover:border-solid': btnGreen,
            'hover:border-secondary': btnGreen,
            'hover:border-1': btnGreen,
        },
        {
            'text-info': btnBlue,
            'bg-primary': btnBlue,
            border: btnBlue,
            'border-solid': btnBlue,
            'border-secondary': btnBlue,
            'border-1': btnBlue,
            'hover:bg-secondary': btnBlue,
            'hover:text-primary': btnBlue,
        }
    );

    const handleClick = () => {
        console.log('ya apreté el botón');
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className={buttonClasses} onClick={handleClick}>
            {text}
        </button>
    );
};

export default MainButton;
