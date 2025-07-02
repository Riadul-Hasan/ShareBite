import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const FeatureCard = ({
    food: {
        foodName = "Food Item",
        foodImage,
        quantity = 0,
        pickupLocation = "Location not specified",
        expiredDateTime,
        additionalNotes,
        donorName = "Donor",

        _id,
        donorImage,
        foodStatus = "available"
    }
}) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1]
            }
        },
        hover: {
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: {
                y: { type: 'spring', stiffness: 400, damping: 15 },
                boxShadow: { duration: 0.3 }
            }
        }
    };

    const imageHoverVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.4 }
        }
    };

    const buttonVariants = {
        rest: {
            background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
            scale: 1
        },
        hover: {
            background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)',
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.97
        }
    };

    const formatExpiration = (dateString) => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <motion.div
            className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            {/* Image Section */}
            <motion.div
                className="relative h-52 overflow-hidden"
                variants={imageHoverVariants}
            >
                <motion.img
                    src={foodImage || '/placeholder-food.jpg'}
                    alt={foodName}
                    className="w-full h-full object-cover"
                    whileHover="hover"
                    onError={(e) => { e.target.src = '/placeholder-food.jpg'; }}
                />

                {/* Food name overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4">
                    <h2 className="text-xl font-bold text-white">{foodName}</h2>
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-4 space-y-3">
                    <div className="flex items-start">

                        <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900">{donorName}</p>
                            <p className="text-xs text-gray-500">{pickupLocation}</p>
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Expires: {formatExpiration(expiredDateTime)}</span>
                    </div>

                    {additionalNotes && (
                        <div className="pt-1">
                            <p className="text-sm text-gray-500 line-clamp-2">
                                <span className="font-medium text-gray-700">Notes:</span> {additionalNotes}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${foodStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {quantity} {quantity === 1 ? 'item' : 'items'} {foodStatus}
                    </div>

                    <Link to={`/featureFoods/${_id}`} className="ml-auto">
                        <motion.button
                            className="px-4 py-2 rounded-lg font-medium text-white text-sm"
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            See More
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCard;