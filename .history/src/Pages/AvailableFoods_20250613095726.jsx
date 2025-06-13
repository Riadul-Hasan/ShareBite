import React from 'react';
import { useLoaderData } from 'react-router';
import AvailableFoodCard from './AvailableFoodCard';

const AvailableFoods = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <section className='py-10'>
                {/* this will be sorting section based on expiry date */}
                <h2 className='text-3xl font-bold '>Sorting Section</h2>
            </section>

            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    data.map(food => <AvailableFoodCard key={food._id} food={food}></AvailableFoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;