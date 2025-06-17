import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';

const MyFoodRequest = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();


  const { data: myRequest, isLoading, error } = useQuery({
  queryKey: ['foodRequests', user?.email],
  queryFn: async () => {
    try {
      const token = await user.getIdToken(); 
      const res = await fetch(`https://food-sharing-server-khaki.vercel.app/myFoodRequest?requesterEmail=${user.email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch requests');
      }
      
      return res.json();
    } catch (err) {
      console.error('Fetch error:', err);
      throw new Error(err.message || 'Network error');
    }
  },
  enabled: !!user?.email
});

// Fixed Mutation
const { mutate: cancelRequest } = useMutation({
  mutationFn: async (requestId) => {
    const token = await user.getIdToken(); 
    const res = await fetch(`https://food-sharing-server-khaki.vercel.app/myFoodRequest/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to cancel request');
    }
    
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['foodRequests']);
  },
  onError: (error) => {
    console.error('Cancel error:', error);
  }
});

  if (isLoading) return <span className="loading loading-bars loading-xl"></span>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    // <div className="min-h-[calc(100vh-250px)] bg-gradient-to-b from-stone-50 to-amber-50 py-8 px-4">
    //   <div className="max-w-6xl mx-auto">
    //     <h2 className="text-3xl font-bold text-center mb-8">My Food Requests</h2>
        

    // {!myRequest || myRequest.length === 0 ? (
    //             <div className="text-center text-red-500 text-2xl p-10 bg-base-300 font-semibold py-20">
    //                 <p>No request added yet.</p>
    //             </div>
    //         ) : (
    //           <div className="bg-white rounded-lg shadow overflow-hidden">
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-green-500">
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Food</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Donor</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Location</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Expiry</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Request Date</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-white ">Action</th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {myRequest?.map((request) => (
    //             <tr key={request._id} className="hover:bg-green-50">
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="flex items-center">
    //                   <img 
    //                     src={request.foodImage} 
    //                     className="w-12 h-12 rounded-md object-cover mr-4"
    //                     alt={request.foodName}
    //                   />
    //                   <span>{request.foodName}</span>
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">{request.donorName}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">{request.pickupLocation}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className={`px-2 py-1 text-xs rounded-full ${
    //                   new Date(request.expireDate) < new Date() 
    //                     ? 'bg-red-100 text-red-800' 
    //                     : 'bg-green-100 text-green-800'
    //                 }`}>
    //                   {new Date(request.expireDate).toLocaleDateString()}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 {new Date(request.requestDate).toLocaleDateString()}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <button
    //                   onClick={() => cancelRequest(request._id)}
    //                   className="text-red-600 hover:text-red-800 text-sm font-medium"
    //                 >
    //                   Cancel
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //         )}


        
    //   </div>
    // </div>
    <div className="min-h-[calc(100vh-250px)] bg-gradient-to-b from-stone-50 to-amber-50 py-8 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">My Food Requests</h2>

    {!myRequest || myRequest.length === 0 ? (
      <div className="text-center text-red-500 text-2xl p-10 bg-base-300 font-semibold py-20">
        <p>No request added yet.</p>
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Scrollable container for mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Food</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myRequest?.map((request) => (
                <tr key={request._id} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center min-w-[200px]">
                      <img 
                        src={request.foodImage} 
                        className="w-12 h-12 rounded-md object-cover mr-4"
                        alt={request.foodName}
                      />
                      <span>{request.foodName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">{request.donorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[150px]">{request.pickupLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(request.expireDate) < new Date() 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {new Date(request.expireDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[100px]">
                    <button
                      onClick={() => cancelRequest(request._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default MyFoodRequest;