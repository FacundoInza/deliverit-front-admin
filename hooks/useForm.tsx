import { ChangeEvent, useState } from 'react';

interface Values {
    [key: string]: string;
}

export const useForm = (initialValues: Values) => {
    const [values, setValues] = useState<Values>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return { values, handleChange };
};
