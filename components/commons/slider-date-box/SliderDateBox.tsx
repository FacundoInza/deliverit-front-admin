import React from 'react';
import classNames from 'classnames';

interface SliderDateBox {
    dayOfTheWeek: string;
    dayNumber: number;
    highlighted?: boolean;
    dateSelectionFunction: () => void;
}

export const SliderDateBox: React.FC<SliderDateBox> = ({
    dayOfTheWeek,
    dayNumber,
    highlighted,
    dateSelectionFunction,
}) => {
    return (
        <button
            className={classNames(
                'text-primary text-lg bg-white rounded-xl h-16 w-12 font-semibold border-2 border-secondary',
                { 'bg-yellow-200': highlighted }
            )}
            onClick={dateSelectionFunction}
        >
            <p>{dayOfTheWeek}</p>
            <p>{dayNumber}</p>
        </button>
    );
};
