// import React from 'react';
// import { useLoaderData } from 'react-router';
// import AvailableFoodCard from './AvailableFoodCard';

// const AvailableFoods = () => {
//     const data = useLoaderData()
//     console.log(data)
//     return (
//         <div>
//             <section className='py-10'>
//                 {/* this will be sorting section based on expiry date */}
//                 <h2 className='text-3xl font-bold '>Sorting Section</h2>
//             </section>

//             <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//                 {
//                     data.map(food => <AvailableFoodCard key={food._id} food={food}></AvailableFoodCard>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default AvailableFoods;

import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AvailableFoodCard from './AvailableFoodCard';

const AvailableFoods = () => {
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <section className=''>
                <div className='flex justify-between items-center bg-amber-100 p-4 md:p-16 lg:p-20'>
                    <h2 className='text-3xl font-bold'>Available Foods</h2>
                    <button 
                        onClick={handleSort}
                        className='btn btn-primary'
                    >
                        Sort by Expiry: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
                    </button>
                </div>
            </section>

  

            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {data.map(food => (
                    <AvailableFoodCard key={food._id} food={food} />
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;