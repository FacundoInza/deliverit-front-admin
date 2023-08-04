import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateDropdownCard.module.css';
import { DatePickerArrow } from '@components/commons/SVG/DatePickerArrow';

interface DateDropdownCard {
    startDate: Date;
}

export const DateDropdownCard: React.FC<DateDropdownCard> = ({ startDate }) => {
    const [selected, setSelectedDate] = useState(startDate);

    useEffect(() => {
        setSelectedDate(startDate);
    }, [startDate]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <>
            <DatePicker
                selected={selected}
                onChange={handleDateChange}
                dateFormat={'dd/MM/yyyy'}
                showYearDropdown
                showMonthDropdown
                className={styles.datepicker}
                maxDate={new Date()}
            />
            <div
                className='w-6 h-6 mt-2 flex align-items-center pointer-events-none absolute'
                style={{
                    marginLeft: 'calc(100vw - 30px)',
                    marginRight: 'calc(100vw - 203px)',
                }}
            >
                <DatePickerArrow />
            </div>
        </>
    );
};
