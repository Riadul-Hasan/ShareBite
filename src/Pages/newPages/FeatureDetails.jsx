import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router';

const FeatureDetails = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-900 dark:to-stone-800 transition-colors duration-300"
        >
            <div className="text-center p-8 max-w-md">
                {/* Floating utensil icon with pulse animation */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-8"
                >
                    <FaUtensils className="text-6xl text-rose-400 dark:text-amber-400 mx-auto" />
                </motion.div>

                {/* Text with staggered animation */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-rose-800 dark:text-amber-200 mb-4"
                >
                    Delicious Update Coming Soon!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-amber-300 mb-8"
                >
                    We're preparing something special for your taste buds. Stay hungry!
                </motion.p>

                {/* Animated button */}
                <Link to="/availableFoods">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="px-6 py-3 bg-rose-500 dark:bg-amber-600 text-white rounded-full shadow-md hover:bg-rose-600 dark:hover:bg-amber-700 transition-colors"
                    >
                        See More
                    </motion.button>
                </Link>

                {/* Floating food items animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {['🍕', '🍔', '🍣', '🥗', '🍰'].map((emoji, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                y: 0,
                                x: Math.random() * 100,
                                opacity: 0
                            }}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 1, 0],
                                x: Math.random() * 100
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            className="absolute text-2xl opacity-20 dark:opacity-30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: '-50px'
                            }}
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureDetails;