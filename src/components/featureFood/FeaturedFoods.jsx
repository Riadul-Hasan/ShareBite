import React, { } from 'react';
import FeatureCard from './FeatureCard';
import { Link, useLoaderData } from 'react-router';

const FeaturedFoods = () => {
    const foods = useLoaderData()
    // console.log(foods)

    return (
        <div className="dark:bg-stone-900 dark:text-amber-100">
            <h2 className='text-3xl font-bold text-center py-2 dark:text-amber-100'>Feature Foods</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 p-2'>
                {foods.map(food => <FeatureCard key={food._id} food={food}></FeatureCard>)}
            </div>
            <div className='text-center'>
                <Link to="/availableFoods">
                    <button className='btn bg-gradient-to-r from-orange-500 to-amber-500 text-white dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800'>
                        Show All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;