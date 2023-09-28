import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

interface ModalProps {
    isSuccess: boolean;
    message: string;
    onClose: () => void;
    onCancel: () => void;
}

const ModalDelete: React.FC<ModalProps> = ({
    isSuccess,
    message,
    onClose,
    onCancel,
}) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
            <div className='bg-white mx-3 p-4 md:p-8 w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-lg shadow-2xl'>
                {isSuccess ? (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex items-center justify-center mb-4 md:mb-16'>
                            <span className='text-cyan-500 text-4xl md:text-6xl'>
                                ✓
                            </span>
                            <h3 className='font-bold text-primary ml-4 text-center text-xl md:text-2xl'>
                                {message}
                            </h3>
                        </div>

                        <div className='flex items-center justify-center space-x-4 mt-4'>
                            <button
                                className='bg-green-400 text-white font-bold text-sm md:text-lg px-4 py-2 md:py-3 rounded-full hover:bg-green-500'
                                onClick={onClose}
                            >
                                YES
                            </button>
                            <button
                                className='bg-red-400 text-white font-bold text-sm md:text-lg px-4 py-2 md:py-3 rounded-full hover:bg-red-500'
                                onClick={onCancel}
                            >
                                NOT
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex items-center justify-center mb-4 md:mb-16'>
                            <span className='text-red-400 text-4xl md:text-6xl'>
                                <TbFaceIdError />
                            </span>
                            <h3 className='font-bold text-red-400 ml-4 text-center text-sm md:text-lg'>
                                {message}
                            </h3>
                        </div>
                        <button
                            onClick={onCancel}
                            className='bg-red-400 text-white text-sm md:text-lg px-4 py-2 md:py-3 rounded-full w-2/3 hover:bg-red-500'
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalDelete;
