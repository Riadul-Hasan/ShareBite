import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';

const MyFoodRequest = () => {
  const { user } = use(AuthContext);

  // Simple fetch with TanStack Query
  const { data: myRequest, isLoading, error } = useQuery({
    queryKey: ['myFoodRequests', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/myFoodRequest?requesterEmail=${user.email}`);
      return res.json();
    },
    enabled: !!user?.email // Only fetch if user exists
  });

  if (isLoading) return <div>Loading your requests...</div>;
  if (error) return <div>Error loading requests</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 p-4">
      <h2 className="text-2xl font-bold mb-4">My Food Requests</h2>
      
      <div className="space-y-4">
        {myRequest?.map(request => (
          <div key={request._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img 
                src={request.foodImage} 
                className="w-16 h-16 object-cover rounded"
                alt={request.foodName}
              />
              <div>
                <h3 className="font-semibold">{request.foodName}</h3>
                <p>From: {request.donorName}</p>
                <p>Pickup: {request.pickupLocation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoodRequest;