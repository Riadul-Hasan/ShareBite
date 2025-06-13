import React from 'react';
import { useLoaderData } from 'react-router';
import AvailableFoodCard from './AvailableFoodCard';

const AvailableFoods = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <section>
                {/* this will be sorting section based on expiry date */}
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