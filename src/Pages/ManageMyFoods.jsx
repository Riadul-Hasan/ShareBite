import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { MdOutlineFoodBank } from "react-icons/md";
import { FaClock, FaEdit, FaTrash } from "react-icons/fa";

const ManageMyFoods = () => {
  const { user } = use(AuthContext)
  const [myFood, setMyFood] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      user.getIdToken().then(token => {
        fetch(`https://food-sharing-server-khaki.vercel.app/manageFoods?email=${user.email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setMyFood(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Fetch error:', error);
            setLoading(false);
          });
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        user.getIdToken().then(token => {
          fetch(`https://food-sharing-server-khaki.vercel.app/addFood/${id}`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Food item has been deleted.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false
                });
                setMyFood(prev => prev.filter(item => item._id !== id));
              }
            })
            .catch(error => {
              console.error('Delete error:', error);
              Swal.fire("Error", "Failed to delete food item", "error");
            });
        });
      }
    });
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.01,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-250px)] py-12 bg-gradient-to-b from-orange-50 to-rose-50 dark:from-stone-900 dark:to-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-rose-500 dark:from-orange-600 dark:to-rose-700 text-white p-3 rounded-full shadow-lg mb-4">
            <MdOutlineFoodBank className="text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-orange-100 mb-3">Manage Your Shared Foods</h1>
          <p className="text-lg text-gray-600 dark:text-orange-200 max-w-2xl mx-auto">
            View, update or remove your shared food items
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 dark:border-orange-400"></div>
          </div>
        ) : myFood.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-12 text-center max-w-2xl mx-auto border border-gray-100 dark:border-stone-700"
          >
            <div className="text-orange-500 dark:text-orange-400 mb-6">
              <div className="bg-orange-100 dark:bg-stone-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-orange-100 mb-3">No Food Items Found</h2>
            <p className="text-gray-600 dark:text-orange-300 mb-8">You haven't shared any food items yet.</p>
            <Link
              to="/addFoods"
              className="inline-block bg-gradient-to-r from-orange-400 to-rose-500 dark:from-orange-600 dark:to-rose-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Share Your First Food Item
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-stone-700"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                <thead className="bg-gradient-to-r from-orange-400 to-rose-500 dark:from-orange-600 dark:to-rose-700">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Food Image
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-stone-800 divide-y divide-gray-200 dark:divide-stone-700">
                  {myFood.map((food, index) => (
                    <motion.tr
                      key={food._id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      variants={rowVariants}
                      className="hover:bg-orange-50/50 dark:hover:bg-stone-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-stone-600"
                        >
                          <img
                            src={food.foodUrl || "/images/food-placeholder.jpg"}
                            alt={food.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/images/food-placeholder.jpg";
                            }}
                          />
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-orange-100">{food.name}</div>
                        <div className="text-xs text-gray-500 dark:text-orange-300 mt-1">
                          {food.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 dark:bg-stone-700 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-stone-600">
                          {food.quantity} servings
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-1 rounded-full mr-2 ${new Date(food.dateTime) < new Date()
                            ? 'bg-red-100 dark:bg-stone-700'
                            : 'bg-orange-100 dark:bg-stone-700'
                            }`}>
                            <FaClock className={
                              new Date(food.dateTime) < new Date()
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-orange-600 dark:text-orange-400'
                            } />
                          </div>
                          <span className={`text-sm ${new Date(food.dateTime) < new Date()
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-orange-300'
                            }`}>
                            {new Date(food.dateTime).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <Link
                            to={`/updateFood/${food._id}`}
                            className="flex items-center text-white bg-green-500 hover:bg-green-600 dark:hover:bg-green-700 px-4 py-2 rounded-md text-sm shadow-md transition-colors"
                          >
                            <FaEdit className="mr-1" /> Update
                          </Link>
                          <motion.button
                            onClick={() => handleDelete(food._id)}
                            className="flex items-center text-white bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 px-4 py-2 rounded-md text-sm shadow-md transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTrash className="mr-1" /> Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-orange-100 to-rose-100 dark:from-stone-800 dark:to-stone-700 rounded-xl p-8 shadow-inner border border-orange-200 dark:border-stone-600"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-orange-100 mb-4">Need Help Managing Your Listings?</h3>
            <p className="text-gray-600 dark:text-orange-200 mb-6">
              Our team is available 24/7 to assist you with any questions about managing your food listings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-rose-500 dark:from-orange-600 dark:to-rose-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-300 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-stone-700 transition-colors"
              >
                View Guidelines
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>

  );
};

export default ManageMyFoods;