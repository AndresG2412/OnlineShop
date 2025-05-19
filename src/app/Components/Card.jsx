import React from 'react';

export default function Card({ titulo, precio }) {
    return (
        <div className='group h-full'>
            <div className='group-hover:scale-110 group-hover:duration-300 animate-zoom-in flex relative flex-col gap-y-4 justify-center h-full bg-white rounded-lg shadow-lg w-full py-4'>
                <div className='h-32 w-32 bg-red-200 rounded-xl shadow-2xl mx-auto'></div>
                <p className='uppercase tracking-wide font-semibold text-xl px-6 overflow-hidden whitespace-nowrap text-ellipsis'>{titulo}</p>
                <hr className='mx-6 border-1 border-black'></hr>
                <div className='flex items-center justify-between w-full px-6'>
                    <p className='tracking-widest font-semibold text-xl'>${precio}</p>
                    <button className='w-5 h-5 bg-purple-300 rounded-sm hover:bg-purple-700 hover:scale-110 hover:duration-200'></button>
                </div>
            </div>
        </div>
    );
}