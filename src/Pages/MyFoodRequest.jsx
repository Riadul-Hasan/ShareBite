import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaInfoCircle, FaClock, FaMapMarkerAlt, FaUser, FaUtensils } from 'react-icons/fa';
import { IoFastFood, IoTimeOutline } from 'react-icons/io5';
import { GiMeal, GiCook } from 'react-icons/gi';
import { MdOutlineFoodBank } from 'react-icons/md';

const MyFoodRequest = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');

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

  const filteredRequests = myRequest?.filter(request => {
    if (activeTab === 'active') return new Date(request.expireDate) >= new Date();
    if (activeTab === 'expired') return new Date(request.expireDate) < new Date();
    return true;
  });

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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] space-y-4">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
      >
        <GiMeal className="text-white text-3xl" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-lg text-gray-600"
      >
        Loading your food requests...
      </motion.p>
    </div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] p-8 text-center"
    >
      <div className="bg-red-100 p-6 rounded-full mb-4">
        <FaInfoCircle className="text-red-500 text-4xl" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md">{error.message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium shadow-md"
        onClick={() => window.location.reload()}
      >
        Try Again
      </motion.button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-250px)] bg-gradient-to-b from-amber-50 to-stone-50 dark:from-stone-900 dark:to-stone-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 text-white p-3 rounded-full shadow-lg mb-4">
            <MdOutlineFoodBank className="text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-amber-100 mb-3">My Food Requests</h1>
          <p className="text-lg text-gray-600 dark:text-amber-200 max-w-2xl mx-auto">
            Track all your food sharing requests in one place
          </p>
        </motion.div>

        {/* Stats Cards - Dark Mode Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {[
            {
              icon: <IoFastFood className="text-amber-600 dark:text-amber-300 text-xl" />,
              bg: "bg-amber-100 dark:bg-stone-700",
              label: "Total Requests",
              value: myRequest?.length || 0
            },
            {
              icon: <GiCook className="text-green-600 dark:text-green-300 text-xl" />,
              bg: "bg-green-100 dark:bg-stone-700",
              label: "Active Requests",
              value: myRequest?.filter(r => new Date(r.expireDate) >= new Date()).length || 0
            },
            {
              icon: <IoTimeOutline className="text-red-600 dark:text-red-300 text-xl" />,
              bg: "bg-red-100 dark:bg-stone-700",
              label: "Expired Requests",
              value: myRequest?.filter(r => new Date(r.expireDate) < new Date()).length || 0
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-stone-700 transition-colors duration-300"
            >
              <div className="flex items-center">
                <div className={`${stat.bg} p-3 rounded-full mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 dark:text-stone-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-amber-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs - Dark Mode Styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex space-x-2 mb-8 border-b border-gray-200 dark:border-stone-700"
        >
          {['all', 'active', 'expired'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab
                  ? 'bg-amber-500 dark:bg-amber-600 text-white'
                  : 'text-gray-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Empty State - Dark Mode */}
        {!filteredRequests || filteredRequests.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-12 bg-white dark:bg-stone-800 rounded-xl shadow-lg max-w-md mx-auto border border-gray-100 dark:border-stone-700"
          >
            <div className="bg-amber-100 dark:bg-stone-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-amber-600 dark:text-amber-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-amber-100 mb-2">
              {activeTab === 'all'
                ? 'No Requests Yet'
                : activeTab === 'active'
                  ? 'No Active Requests'
                  : 'No Expired Requests'}
            </h3>
            <p className="text-gray-500 dark:text-amber-200 mb-6">
              {activeTab === 'all'
                ? "You haven't made any food requests yet."
                : activeTab === 'active'
                  ? 'You currently have no active food requests.'
                  : 'All your requests are still active.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 text-white px-6 py-2 rounded-lg font-medium shadow-md"
            >
              Browse Available Food
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-stone-700"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                <thead className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Food Details</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Donor Info</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Timeline</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-stone-800 divide-y divide-gray-200 dark:divide-stone-700">
                  <AnimatePresence>
                    {filteredRequests.map((request) => (
                      <motion.tr
                        key={request._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors duration-200"
                      >
                        {/* Table cells with dark mode styles */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <motion.img
                              src={request.foodImage}
                              className="w-16 h-16 rounded-lg object-cover mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                              alt={request.foodName}
                              whileHover={{ scale: 1.05 }}
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-amber-100">{request.foodName}</p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-amber-300 mt-1">
                                <FaMapMarkerAlt className="mr-1 text-amber-600 dark:text-amber-400" />
                                <span>{request.pickupLocation}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-amber-100 dark:bg-stone-700 p-2 rounded-full mr-3">
                              <FaUser className="text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-amber-100">{request.donorName}</p>
                              <p className="text-sm text-gray-500 dark:text-amber-300">{request.donorEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <div className="bg-green-100 dark:bg-stone-700 p-1 rounded-full mr-2">
                                <FaClock className="text-green-600 dark:text-green-400 text-xs" />
                              </div>
                              <span className="text-gray-600 dark:text-amber-200">
                                Requested: {new Date(request.requestDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className={`flex items-center text-sm ${new Date(request.expireDate) < new Date()
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-amber-600 dark:text-amber-400'
                              }`}>
                              <div className={`p-1 rounded-full mr-2 ${new Date(request.expireDate) < new Date()
                                  ? 'bg-red-100 dark:bg-stone-700'
                                  : 'bg-amber-100 dark:bg-stone-700'
                                }`}>
                                <FaClock className={
                                  new Date(request.expireDate) < new Date()
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-amber-600 dark:text-amber-400'
                                } />
                              </div>
                              <span>
                                Expires: {new Date(request.expireDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <motion.button
                              onClick={() => cancelRequest(request._id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 font-medium text-sm transition-colors"
                            >
                              <FaTrash className="mr-1" /> Cancel
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Help Section - Dark Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-amber-100 to-orange-50 dark:from-stone-800 dark:to-stone-700 rounded-xl p-8 shadow-inner border border-amber-200 dark:border-stone-600"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-amber-100 mb-4">Need Help With Your Requests?</h3>
            <p className="text-gray-600 dark:text-amber-200 mb-6">
              If you have any questions about your food requests or need assistance,
              our support team is here to help you 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-300 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
              >
                Visit FAQ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyFoodRequest;