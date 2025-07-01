import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ food }) => {
    const { foodImage, foodName, additionalNotes, donorEmail, expiredDateTime, pickupLocation, quantity } = food;

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px -10px rgba(255, 105, 0, 0.3)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const titleVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3
            }
        }
    };

    const detailItemVariants = {
        hover: {
            x: 5,
            color: "#ea580c",
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100 relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
        >
            {/* Floating availability badge */}
            <motion.div
                className="absolute top-4 right-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs font-bold py-1 px-3 rounded-full z-10 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
            >
                {quantity} available
            </motion.div>

            {/* Image section with parallax effect */}
            <motion.div
                className="relative h-56 overflow-hidden"
                variants={imageVariants}
            >
                <motion.img
                    src={foodImage || '/placeholder-food.jpg'}
                    alt={foodName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder-food.jpg';
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Gradient overlay with floating title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <motion.h2
                        className="text-2xl font-bold text-white"
                        variants={titleVariants}
                    >
                        {foodName}
                    </motion.h2>
                </div>
            </motion.div>

            {/* Details section with staggered animations */}
            <motion.div
                className="p-6 space-y-4"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
            >
                <motion.div
                    className="flex items-center gap-3 text-sm"
                    variants={detailItemVariants}
                >
                    <span className="text-orange-500 font-semibold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Expires:
                    </span>
                    <span className="text-gray-700">{expiredDateTime}</span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-3 text-sm"
                    variants={detailItemVariants}
                >
                    <span className="text-orange-500 font-semibold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Location:
                    </span>
                    <span className="text-gray-700">{pickupLocation}</span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-3 text-sm"
                    variants={detailItemVariants}
                >
                    <span className="text-orange-500 font-semibold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Donor:
                    </span>
                    <span className="text-gray-700 truncate">{donorEmail}</span>
                </motion.div>

                {additionalNotes && (
                    <motion.div
                        className="pt-3 border-t border-orange-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-sm text-gray-600 italic">
                            "{additionalNotes}"
                        </p>
                    </motion.div>
                )}

                {/* Animated action button */}
                <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold shadow-md relative overflow-hidden"
                        whileHover={{
                            background: "linear-gradient(45deg, #f97316, #f59e0b)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        Reserve Now
                        <motion.span
                            className="absolute right-4"
                            animate={{
                                x: [0, 4, 0],
                                transition: {
                                    repeat: Infinity,
                                    duration: 1.5
                                }
                            }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FeatureCard;