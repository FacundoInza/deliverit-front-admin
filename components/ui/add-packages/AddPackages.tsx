'use client';

import React, { FC, useState } from 'react';
import { GeneralCard } from '../generalCard/GeneralCard';
import { RiUserReceived2Line, RiMap2Line } from 'react-icons/ri';
import { GiWeight } from 'react-icons/gi';
import MainButton from '../../../components/commons/buttons/MainButton';
import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-google-places-autocomplete';
import LocationMap from '../locationMap/LocationMap';
import { ItemQuantity } from '../../commons/item-quantity/ItemQuantity';
import { useForm } from 'react-hook-form';
import dotenv from 'dotenv';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';
import OptimisticUpdateFailureNotification from '../../../components/ui/modal/OptimisticUpdateFailureNotification';
import { api } from '../../../api/axiosInstance';
import currentEnv from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getOrders } from '../../../redux/features/orders/ordersThunk';
import { filteredDate } from '../../../redux/features/filtered-date/filteredDateSelector';

dotenv.config();

type OptionType = { label: string; value: string };
type CoordsType = { lat: number; lng: number } | null;

interface FormsData {
    recipient: string;
    weight: number;
    packagesQuantity: number;
    deliveryDate: string;
    address: string;
    coords: CoordsType;
}

export const AddPackages: FC = () => {
    const [value, setValue] = useState<OptionType | null>(null);
    const [coords, setCoords] = useState<CoordsType>(null);
    const [packagesQuantity, setQuantity] = useState<number>(0);

    const { error } = useAppSelector(deliveries);
    const selectedDate = useAppSelector(filteredDate);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue: setFormValue,
    } = useForm<FormsData>();

    const apikey = currentEnv.NEXT_PUBLIC_GOOGLE_API_KEY;

    const handleChange = (newValue: OptionType | null) => {
        setValue(newValue);
        if (newValue) {
            geocodeByAddress(newValue.label)
                .then((results) => {
                    getLatLng(results[0]).then(({ lat, lng }) => {
                        console.log('Successfully got latitude and longitude', {
                            lat,
                            lng,
                        });
                        setCoords({ lat, lng });
                    });
                })
                .catch((error) => console.error(error));
        } else {
            setCoords(null);
            setValue(null);
        }
    };

    const handleMinus = () => {
        if (packagesQuantity > 0) {
            setQuantity(packagesQuantity - 1);
            setFormValue('packagesQuantity', packagesQuantity - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(packagesQuantity + 1);
        setFormValue('packagesQuantity', packagesQuantity + 1);
    };

    const router = useRouter();

    /*     const onSubmit = (data: FormsData) => {
        const dataToSend = {
            ...data,
            address: value?.label,
            coords,
        };
        console.log('Data to send----->', dataToSend);
    };
 */
    const onSubmit = async (data: FormsData) => {
        const dataToSend = {
            /* ...data, */
            deliveryDate: data.deliveryDate,

            packagesQuantity,
            recipient: data.recipient,
            weight: Number(data.weight),

            address: value?.label,
            coords,
        };

        console.log('data', dataToSend);

        /* console.log('Valor del peso:', typeof data.weight, typeof data.packagesQuantity); */

        try {
            const response = await api.post('/api/order', dataToSend);
            console.log('Orden agregada con éxito:', response.data);
            dispatch(getOrders({ pageNumber: 1, selectedDate: selectedDate }));
            router.back();
        } catch (error) {
            console.error('Error al agregar la orden:', error);
        }
    };

    return (
        <>
            {error && <OptimisticUpdateFailureNotification />}

            <GeneralCard title='Create order'>
                <div
                    className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'
                    style={{ maxHeight: '70vh' }}
                >
                    <div className='mt-1 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <form
                            className='space-y-6'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <div className='relative mt-2'>
                                    <input
                                        placeholder="Recipient's Name"
                                        id='recipient'
                                        type='text'
                                        autoComplete='recipient'
                                        {...register('recipient', {
                                            required:
                                                'recipient&apos;s recipient is required',
                                        })}
                                        className='
                                    peer
                                    mt-0
                                    block
                                    w-full
                                    px-8 py-2
                                    border-0 border-b border-gray-200
                                    focus: outline-none
                                    text-primary
                                    placeholder-transparent
                                    sm:text-sm sm:leading-6
                                    '
                                    />
                                    <label
                                        htmlFor='recipient'
                                        className='absolute left-3 -top-3 text-primary text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:ps-5 '
                                    >
                                        Recipient&apos;s Name
                                    </label>

                                    <span className='absolute top-1/2 left-1 transform -translate-y-6 text-primary'>
                                        <RiUserReceived2Line size={25} />
                                    </span>

                                    <div style={{ height: '20px' }}>
                                        {errors.recipient && (
                                            <span className='text-red-500 text-xs'>
                                                {errors.recipient.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='relative mt-2'>
                                    <input
                                        placeholder='Weight (in Kgs.)'
                                        id='weight'
                                        type='number'
                                        autoComplete='weight'
                                        {...register('weight', {
                                            required: 'Weight is required',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message:
                                                    'Only numbers are allowed',
                                            },
                                        })}
                                        className='
                                    peer
                                    mt-0
                                    block
                                    w-full
                                    px-8 py-2
                                    border-0 border-b border-gray-200
                                    focus: outline-none
                                    text-primary
                                    placeholder-transparent
                                    sm:text-sm sm:leading-6
                                    '
                                    />
                                    <label
                                        htmlFor='weight'
                                        className='absolute left-3 -top-3 text-primary text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:ps-5'
                                    >
                                        Weight (in Kgs.)
                                    </label>

                                    <span className='absolute top-1/2 left-1 transform -translate-y-6 text-primary'>
                                        <GiWeight size={25} />
                                    </span>
                                    <div style={{ height: '20px' }}>
                                        {errors.weight && (
                                            <span className='text-red-500 text-xs'>
                                                {errors.weight.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='relative mt-2'>
                                    <div className='flex mt-4 justify-between'>
                                        <div className='flex-1 pr-2 border-r border-gray-200 relative'>
                                            <input
                                                min={
                                                    new Date()
                                                        .toISOString()
                                                        .split('T')[0]
                                                }
                                                placeholder='Delivery Date'
                                                id='deliveryDate'
                                                type='date'
                                                autoComplete='deliveryDate'
                                                {...register('deliveryDate', {
                                                    required:
                                                        'Delivery Date is required',
                                                })}
                                                className='
                                            peer
                                            mt-0
                                            block
                                            w-full
                                            max-w-xs
                                            py-2
                                            border-0 border-b border-gray-200
                                            focus:outline-none
                                            text-primary
                                            placeholder-transparent
                                            sm:text-sm sm:leading-6
                                        '
                                            />
                                            <label
                                                htmlFor='deliveryDate'
                                                className='
                                            absolute -top-3 text-primary text-xs 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400 
                                            peer-placeholder-shown:top-2.5 
                                            peer-placeholder-shown:ps-5
                                        '
                                            >
                                                Delivery Date
                                            </label>
                                        </div>

                                        <div className='flex-1 pl-2 flex justify-center items-center relative'>
                                            <div className='w-full max-w-xs flex justify-center items-center'>
                                                <ItemQuantity
                                                    packagesQuantity={
                                                        packagesQuantity
                                                    }
                                                    handleMinusQuantity={
                                                        handleMinus
                                                    }
                                                    handlePlusQuantity={
                                                        handlePlus
                                                    }
                                                />
                                                <input
                                                    id='packagesQuantity'
                                                    type='hidden'
                                                    autoComplete='packagesQuantity'
                                                    value={packagesQuantity}
                                                    {...register(
                                                        'packagesQuantity',
                                                        {
                                                            required:
                                                                'packagesQuantity is required',
                                                            validate: (value) =>
                                                                value > 0 ||
                                                                'packagesQuantity must be greater than 0',
                                                        }
                                                    )}
                                                />
                                            </div>

                                            <label
                                                htmlFor='packagesQuantity'
                                                className='
                                            absolute
                                             text-primary text-xs 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400 
                                            -top-3
                                            m-auto
                                            h-10
                                        '
                                            >
                                                Quantity
                                            </label>
                                            <div
                                                className='absolute top-10 right-0 text-right'
                                                style={{ height: '20px' }}
                                            >
                                                {errors.packagesQuantity && (
                                                    <span className='text-red-500 text-xs'>
                                                        {
                                                            errors
                                                                .packagesQuantity
                                                                .message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='relative mt-14 sm:mt-4'>
                                    <span className='z-10 absolute top-1.5 left-1 text-primary'>
                                        <RiMap2Line size={25} />
                                    </span>

                                    <GooglePlacesAutocomplete
                                        apiKey={apikey}
                                        debounce={1000}
                                        minLengthAutocomplete={3}
                                        selectProps={{
                                            value,
                                            onChange: handleChange,
                                            placeholder: 'Delivery address...',
                                            isClearable: true,
                                            styles: {
                                                input: (provided) => ({
                                                    ...provided,
                                                    paddingLeft: '25px',
                                                    color: '#22577A',
                                                }),
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: '#22577A',
                                                    paddingLeft: '25px',
                                                }),
                                                singleValue: (provided) => ({
                                                    ...provided,
                                                    color: '#22577A',
                                                    paddingLeft: '25px',
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    paddingLeft: '25px',
                                                }),
                                                control: (
                                                    baseStyles,
                                                    state
                                                ) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused
                                                        ? '#22577A'
                                                        : 'grey',
                                                }),
                                            },
                                        }}
                                        onLoadFailed={(error) => {
                                            console.error(
                                                'Could not inject Google script',
                                                error
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            {value && coords ? (
                                <div className='w-full h-48 sm:h-56'>
                                    <LocationMap
                                        coords={coords}
                                        address={value.label}
                                    />
                                </div>
                            ) : (
                                <div className='w-full h-48 sm:h-56'></div>
                            )}
                            <div className='space-y-6'>
                                <div>
                                    <MainButton text='Create order' btnGreen />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </GeneralCard>
        </>
    );
};
