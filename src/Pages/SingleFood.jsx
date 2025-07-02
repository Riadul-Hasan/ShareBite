import React, { use, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaUser, FaEnvelope, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { GiMeal, GiCook } from 'react-icons/gi';
import { IoFastFood, IoTimeOutline } from 'react-icons/io5';
import { BiFoodTag } from 'react-icons/bi';

const SingleFood = () => {
    const singleFood = useLoaderData();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const { _id, name, foodUrl, quantity, location, notes, dateTime, foodStatus, donorName, email } = singleFood;
    const [additionalNotes, setAdditionalNotes] = useState('');

    const handleRequest = (e) => {
        e.preventDefault();
        const requestData = {
            foodId: _id,
            foodName: name,
            foodImage: foodUrl,
            quantity,
            pickupLocation: location,
            expireDate: dateTime,
            email,
            donorName,
            requesterEmail: user.email,
            requestDate: new Date().toISOString(),
            additionalNotes,
            foodStatus: 'requested'
        };

        document.getElementById('request_modal').close();

        fetch("https://food-sharing-server-khaki.vercel.app/myRequest", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(result => result.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Request Submitted!",
                        text: "Your food request has been placed successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#f8fafc',
                        customClass: {
                            popup: 'rounded-2xl shadow-xl'
                        }
                    });
                    navigate("/myFoodRequest");
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Request Failed",
                    text: "Something went wrong. Please try again.",
                    background: '#f8fafc',
                    customClass: {
                        popup: 'rounded-2xl shadow-xl'
                    }
                });
            });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)"
        },
        tap: { scale: 0.98 }
    };

    const imageHoverVariants = {
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <title>{name} | Share Bite</title>

            {/* Back button */}
            <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ x: -5 }}
                className="flex items-center text-amber-600 mb-6 font-medium"
            >
                <FaArrowLeft className="mr-2" />
                Back to Foods
            </motion.button>

            {/* Main content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
            >
                {/* Food card */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Food image */}
                    <motion.div
                        variants={imageHoverVariants}
                        whileHover="hover"
                        className="lg:w-1/2 h-80 lg:h-auto overflow-hidden relative"
                    >
                        <img
                            src={foodUrl}
                            alt={name}
                            className="w-full h-[600px] object-cover"
                            onError={(e) => e.target.src = '/placeholder-food.jpg'}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                            <h1 className="text-2xl font-bold text-white">{name}</h1>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center text-sm text-amber-100 mr-4">
                                    <FaUser className="mr-2" />
                                    <span>{donorName}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${foodStatus === 'available'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {foodStatus === 'available' ? 'Available' : 'Requested'}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Food details */}
                    <motion.div
                        variants={containerVariants}
                        className="lg:w-1/2 p-8 space-y-6"
                    >
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-amber-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                                            <IoFastFood className="text-amber-600" />
                                        </div>
                                        <h3 className="font-medium text-gray-700">Quantity</h3>
                                    </div>
                                    <p className="text-2xl font-bold text-amber-600">{quantity} servings</p>
                                </div>

                                <div className="bg-amber-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                                            <IoTimeOutline className="text-amber-600" />
                                        </div>
                                        <h3 className="font-medium text-gray-700">Expires</h3>
                                    </div>
                                    <p className="text-xl font-bold text-red-500">
                                        {new Date(dateTime).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                                        <FaMapMarkerAlt className="text-amber-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-700">Pickup Location</h3>
                                </div>
                                <p className="text-lg text-gray-800">{location}</p>
                            </div>

                            {notes && (
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400"
                                >
                                    <div className="flex items-start">
                                        <FaInfoCircle className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-gray-700 mb-1">Special Notes</h3>
                                            <p className="text-gray-700">{notes}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <motion.button
                                onClick={() => document.getElementById('request_modal').showModal()}
                                disabled={foodStatus !== 'available'}
                                variants={buttonVariants}
                                whileHover={foodStatus === 'available' ? "hover" : {}}
                                whileTap={foodStatus === 'available' ? "tap" : {}}
                                className={`w-full py-4 px-6 rounded-xl font-medium text-white text-lg ${foodStatus === 'available'
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {foodStatus === 'available' ? (
                                    <span className="flex items-center justify-center">
                                        <GiCook className="mr-3 text-xl" />
                                        Request This Food
                                    </span>
                                ) : (
                                    'Already Requested'
                                )}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>


            </motion.div>

            {/* Request modal */}
            <dialog id="request_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl max-h-screen overflow-y-auto rounded-2xl overflow-hidden p-8 lg:p-2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-xl text-white"
                    >
                        <h3 className="font-bold text-2xl flex items-center">
                            <GiMeal className="mr-3" />
                            Food Request Form
                        </h3>
                        <p className="text-amber-100">Complete the form to request "{name}"</p>
                    </motion.div>

                    <form onSubmit={handleRequest} className="p-6">
                        <motion.div
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <img
                                        src={foodUrl}
                                        alt={name}
                                        className="h-32 w-32 object-cover rounded-xl shadow-md"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                        {quantity} left
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center text-gray-700">
                                            <IoFastFood className="mr-2 text-amber-600" />
                                            Food Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="foodName"
                                        defaultValue={name}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-50 focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center text-gray-700">
                                            <FaUser className="mr-2 text-amber-600" />
                                            Donor Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="donorName"
                                        defaultValue={donorName}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-50 focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center text-gray-700">
                                            <FaMapMarkerAlt className="mr-2 text-amber-600" />
                                            Pickup Location
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        defaultValue={location}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-50 focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center text-gray-700">
                                            <FaClock className="mr-2 text-amber-600" />
                                            Expiry Date
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="expireDate"
                                        defaultValue={new Date(dateTime).toLocaleDateString()}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-50 focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label className="label">
                                    <span className="label-text font-medium flex items-center text-gray-700">
                                        <FaInfoCircle className="mr-2 text-amber-600" />
                                        Additional Notes
                                    </span>
                                </label>
                                <textarea
                                    name="additionalNotes"
                                    value={additionalNotes}
                                    onChange={(e) => setAdditionalNotes(e.target.value)}
                                    className="textarea textarea-bordered w-full focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    placeholder="Any special requests or pickup instructions"
                                    rows="3"
                                />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="modal-action mt-6 flex justify-end space-x-3"
                            >
                                <motion.button
                                    type="button"
                                    className="btn btn-ghost border border-gray-300 hover:bg-gray-100"
                                    onClick={() => document.getElementById('request_modal').close()}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="btn bg-gradient-to-r from-amber-500 to-orange-500 border-none text-white hover:from-amber-600 hover:to-orange-600"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Submit Request
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </motion.div>
    );
};

export default SingleFood;