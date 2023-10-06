import React from 'react';
import Image from 'next/image';

interface CircularImageProps {
    src: any;
    alt: string;
    diameter: number;
}

export function CircularImage({ src, alt, diameter }: CircularImageProps) {
    return (
        <div
            className='relative rounded-full overflow-hidden'
            style={{ width: diameter, height: diameter }}
        >
            <Image
                src={src}
                alt={alt}
                layout='fill'
                className='rounded-full object-cover'
            />
        </div>
    );
}
