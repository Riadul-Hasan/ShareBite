import React, { } from 'react';
import FeatureCard from './FeatureCard';
import { useLoaderData } from 'react-router';

const FeaturedFoods = () => {
    const foods = useLoaderData()
    // console.log(foods)
   
    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-2'>Feature Foods</h2>
            <div>
                {
                    foods.map(food => <FeatureCard key={food._id} food={food}></FeatureCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedFoods;