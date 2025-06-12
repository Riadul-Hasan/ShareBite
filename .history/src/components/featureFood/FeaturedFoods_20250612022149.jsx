import React, { use } from 'react';

const FeaturedFoods = ({featurePromise}) => {
    const foods = use(featurePromise)
    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-2'>Feature Foods</h2>
        </div>
    );
};

export default FeaturedFoods;