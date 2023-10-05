import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateDropdownCard.module.css';
import { DatePickerArrow } from '../../../components/commons/SVG/DatePickerArrow';
import { dateFormatting } from '../../../utils';

interface DateDropdownCard {
    startDate: string | undefined;
    setDate: (date: string | undefined) => void;
}

export const DateDropdownCard: React.FC<DateDropdownCard> = ({
    startDate,
    setDate,
}) => {
    const [selectedDate, setSelectedDate] = useState(
        new Date(new Date(startDate || '').getTime() + 3 * 60 * 60 * 1000)
    );

    useEffect(() => {
        setSelectedDate(
            new Date(new Date(startDate || '').getTime() + 3 * 60 * 60 * 1000)
        );
    }, [startDate]);

    const handleDateChange = async (date: Date | null) => {
        if (date) {
            const dateMerge = dateFormatting(date);

            setSelectedDate(date);
            setDate(dateMerge);
        }
    };

    return (
        <>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat={'dd/MM/yyyy'}
                showYearDropdown
                showMonthDropdown
                className={styles.datepicker}
            />
            <div
                className='w-6 h-6 flex align-items-center pointer-events-none absolute'
                style={{
                    marginLeft: 'calc(100vw - 30px)',
                    marginRight: 'calc(100vw - 153px)',
                }}
            >
                <DatePickerArrow />
            </div>
        </>
    );
};
