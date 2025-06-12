import React, { use } from 'react';
import FeatureCard from './FeatureCard';

const FeaturedFoods = ({featurePromise}) => {
    const foods = use(featurePromise)
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