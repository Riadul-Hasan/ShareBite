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
                <div className='flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50  p-4 md:p-16 lg:p-18'>
                    <h2 className='text-3xl font-bold'>Available Foods</h2>
                    <button 
                        onClick={handleSort}
                        className='btn btn-primary'
                    >
                        Sort by Expiry: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
                    </button>
                </div>
            </section>
                      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-inner mb-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Title with food icon */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 rounded-full">
          <span className="text-2xl">🍲</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
          Fresh Food Available
        </h2>
      </div>
      
      {/* Sort button with animated transition */}
      <button
        onClick={handleSort}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <span className="text-lg font-medium">
          {sortOrder === 'asc' ? 'Soonest to Expire' : 'Newest Additions'}
        </span>
        <span className="text-xl transition-transform duration-300 group-hover:rotate-180">
          {sortOrder === 'asc' ? '⏱️' : '🆕'}
        </span>
      </button>
    </div>
    
    {/* Subtle description */}
    <p className="mt-4 text-center md:text-left text-amber-700/80 max-w-2xl">
      Discover fresh meals shared by your community. Sort to find what needs to be claimed soonest.
    </p>
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