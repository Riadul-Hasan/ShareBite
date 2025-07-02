import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

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
      className="min-h-[calc(100vh-250px)] py-12 bg-gradient-to-b from-orange-50 to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Your Shared Foods</h1>
          <p className="text-gray-600">View, update or remove your shared food items</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : myFood.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto"
          >
            <div className="text-orange-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Food Items Found</h2>
            <p className="text-gray-600 mb-6">You haven't shared any food items yet.</p>
            <Link
              to="/addFood"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Share Your First Food Item
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Food Image
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myFood.map((food, index) => (
                    <motion.tr
                      key={food._id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      variants={rowVariants}
                      className="hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-md overflow-hidden"
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
                        <div className="text-sm font-medium text-gray-900">{food.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          {food.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(food.dateTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/updateFood/${food._id}`}
                            className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            Update
                          </Link>
                          <motion.button
                            onClick={() => handleDelete(food._id)}
                            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Delete
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
      </div>
    </motion.div>
  );
};

export default ManageMyFoods;