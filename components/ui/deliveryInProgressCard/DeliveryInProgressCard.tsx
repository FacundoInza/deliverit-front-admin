import React from 'react';
import Image from 'next/image';
import imagen from './imagen.png';
import MainButton from '../../commons/buttons/MainButton';

const DeliveryInProgressCard: React.FC = () => {
    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 '>
                <div className=' mt-0 sm:mx-auto sm:w-full sm:max-w-sm '>
                    <div className='border-primary border'>
                        <Image
                            src={imagen}
                            alt='es la imagen del mapa'
                            width={385}
                            height={282}
                            className='max-w-full h-auto'
                        />
                    </div>
                    <div className='mt-8'>
                        <p className='text-primary font-poppins font-bold text-sm leading-5'>
                            Destino:{' '}
                            <span className='text-blue-900 font-poppins font-normal text-sm leading-5'>
                                Amenabar 2356, CABA
                            </span>
                        </p>

                        <p className='text-primary font-poppins font-bold text-sm leading-5'>
                            Número de paquete:{' '}
                            <span className='font-normal'>#0A235</span>
                        </p>

                        <p className='text-primary font-poppins font-bold text-sm leading-5'>
                            Recibe:{' '}
                            <span className='font-normal'>
                                {' '}
                                David Rodriguez{' '}
                            </span>
                        </p>
                        <div className='mt-8 '>
                            <MainButton text='Finish' btnGreen />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryInProgressCard;
