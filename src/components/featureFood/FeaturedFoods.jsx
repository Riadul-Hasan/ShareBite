import React, { } from 'react';
import FeatureCard from './FeatureCard';
import { Link, useLoaderData } from 'react-router';

const FeaturedFoods = () => {
    const foods = useLoaderData()
    // console.log(foods)

    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-2'>Feature Foods</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10'>
                {
                    foods.map(food => <FeatureCard key={food._id} food={food}></FeatureCard>)
                }
            </div>
            <div className='text-center'>
                <Link to="/availableFoods">
                    <button className='btn btn-primary '>Show All</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;