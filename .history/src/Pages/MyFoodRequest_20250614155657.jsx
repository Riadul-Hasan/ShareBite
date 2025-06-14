import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const MyFoodRequest = () => {

     const { user } = use(AuthContext)

    const [myRequest, setMyRequest] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/myFoodRequest?requesterEmail=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMyRequest(data)
            })
    }, [user])


    return (
       
    
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        My Food Requests
      </h2>
      
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="avatar">
          <div className="w-32 rounded-full ring-4 ring-amber-500 ring-offset-4 ring-offset-pink-50">
            <img src={user.photoURL} alt="User profile" className="object-cover" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold text-green-600">Username: </span>
              <span className="text-gray-700">{user.displayName}</span>
            </p>
            <p className="text-lg">
              <span className="font-bold text-green-600">Email: </span>
              <span className="text-gray-700">{user.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Food Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Request Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myRequest.map((request) => {
              
                const expireDate = new Date(request.expireDate).toLocaleDateString();
                const requestDate = new Date(request.requestDate).toLocaleDateString();
                
                return (
                  <tr key={request._id} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={request.foodImage}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        alt={request.foodName}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.donorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.pickupLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        new Date(request.expireDate) < new Date() 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {expireDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {requestDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    
  </div>
</div>
    );
};

export default MyFoodRequest;