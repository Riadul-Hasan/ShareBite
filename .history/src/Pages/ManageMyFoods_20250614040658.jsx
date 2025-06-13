import React from 'react';
import { useLoaderData } from 'react-router';

const ManageMyFoods = () => {
    const data = useLoaderData()
    console.log(data)
    
    return (
        <div>
          {
            data.map(singleData => <p>{singleData.name}</p>)
          }

               <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full">
                {/* Compact Table Header */}
                <thead className="bg-gray-50">
                    <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-3 py-2 text-left">Image</th>
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-center">Qty</th>
                        <th className="px-3 py-2 text-left">Expires</th>
                        <th className="px-3 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                    {data.map(singleData => (
                        <tr key={singleData._id} className="hover:bg-gray-50 transition-colors">
                            {/* Food Image */}
                            <td className="px-3 py-2 whitespace-nowrap">
                                <img 
                                    src={singleData.foodImage} 
                                    alt={singleData.name}
                                    className="w-10 h-10 object-cover rounded-sm"
                                    onError={(e) => e.target.src = '/placeholder-food.jpg'}
                                />
                            </td>
                            
                            {/* Food Name */}
                            <td className="px-3 py-2 text-sm font-medium text-gray-900 max-w-[150px] truncate">
                                {singleData.name}
                            </td>
                            
                            {/* Quantity */}
                            <td className="px-3 py-2 text-center text-sm text-gray-500">
                                {singleData.quantity}
                            </td>
                            
                            {/* Expiry Date */}
                            <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {new Date(singleData.dateTime).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </td>
                            
                            {/* Action Buttons */}
                            <td className="px-3 py-2 text-center whitespace-nowrap">
                                <div className="flex justify-center space-x-1">
                                    <button className="p-1.5 text-blue-600 hover:text-blue-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round"  strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button className="p-1.5 text-red-600 hover:text-red-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>

        
    );
};

export default ManageMyFoods;