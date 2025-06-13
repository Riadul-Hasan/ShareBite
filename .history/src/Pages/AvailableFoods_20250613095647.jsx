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

            <div>
                {
                    data.map(food => <AvailableFoodCard key={food._id} food={food}></AvailableFoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;