import { useQuery, useMutation } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import { use,  useState } from 'react';

const MyFoodRequest = () => {
  const { user } = use(AuthContext);
  const [cancelRequestId, setCancelRequestId] = useState(null);

  // Fetch food requests using TanStack Query
  const { data: myRequest, isLoading, error, refetch } = useQuery({
    queryKey: ['foodRequests', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/myFoodRequest?requesterEmail=${user.email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!user?.email // Only run the query if user.email exists
  });

  // Mutation for canceling a food request
  const cancelRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      const response = await fetch(`http://localhost:3000/myFoodRequest/${requestId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to cancel request');
      }
      return response.json();
    },
    onSuccess: () => {
      // Refetch the requests after successful cancellation
      refetch();
      setCancelRequestId(null);
    },
    onError: (error) => {
      console.error('Error canceling request:', error);
    }
  });

  const handleCancelRequest = (requestId) => {
    setCancelRequestId(requestId);
    cancelRequestMutation.mutate(requestId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading your food requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            My Food Requests
          </h2>
          
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring-4 ring-cyan-500 ring-offset-4 ring-offset-pink-50">
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
                    Food Name
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myRequest?.map((request) => {
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
                        {request.foodName}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleCancelRequest(request._id)}
                          disabled={cancelRequestId === request._id}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${
                            cancelRequestId === request._id
                              ? 'bg-gray-300 text-gray-700'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          {cancelRequestId === request._id ? 'Canceling...' : 'Cancel'}
                        </button>
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