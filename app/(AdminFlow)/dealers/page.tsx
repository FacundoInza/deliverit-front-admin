'use client';

import React, { FC, useEffect } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { DealerCard } from '../../../components/ui/dealerCard/DealerCard';
import { useAppSelector } from '../../../hooks/useAppSelector';

import Swiper from 'swiper';
import 'swiper/css/bundle'; // Importar los estilos CSS de Swiper

const DealerPage: FC = () => {
    const { allDealers } = useAppSelector((state) => state.dealers);

    useEffect(() => {
        // Inicializar Swiper solo después de que el componente esté montado
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1, // Mostrar un slide completo a la vez
            spaceBetween: 10, // Espacio entre las tarjetas
            direction: 'horizontal', // Desplazamiento horizontal
            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                type: 'bullets',
                clickable: true,
                enabled: true,
            },
        });

        return () => {
            swiper.destroy(); // Limpia el Swiper cuando el componente se desmonta
        };
    }, []);

    // Agrupar las tarjetas en grupos de 4
    const groupedDealers = [];
    for (let i = 0; i < allDealers.length; i += 4) {
        groupedDealers.push(allDealers.slice(i, i + 4));
    }

    return (
        <GeneralCard title='Dealers'>
            <div className='swiper'>
                <div className='swiper-wrapper'>
                    {groupedDealers.map((dealersGroup, index) => (
                        <div className='swiper-slide' key={index}>
                            <div className='grid grid-cols-1 gap-10'>
                                {dealersGroup.map((dealer, subIndex) => (
                                    <DealerCard
                                        dealer={dealer}
                                        key={subIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='swiper-pagination'></div>
            </div>
        </GeneralCard>
    );
};

export default DealerPage;
