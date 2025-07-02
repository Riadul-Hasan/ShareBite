import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const PromotionalSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Zero Waste",
            description: "Help reduce food waste in your community"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Community",
            description: "Connect with neighbors through sharing"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Verified",
            description: "Quality checked donations"
        }
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Join the Food Sharing Movement
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        Discover how sharing food can transform communities
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-orange-100/50 text-orange-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{feature.title}</h3>
                            <p className="text-gray-600 text-sm text-center">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="relative bg-white rounded-xl shadow-md overflow-hidden border border-orange-200"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute inset-0 bg-orange-500/5"></div>
                    <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to make a difference?</h3>
                            <p className="text-gray-600 mb-6">
                                Join our community of food sharers today. It only takes a minute to get started.
                            </p>
                            <motion.button
                                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-6 rounded-full shadow-sm"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Sign Up Now
                            </motion.button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <motion.div
                                className="relative"
                                animate={{
                                    y: [0, -8, 0],
                                    transition: {
                                        repeat: Infinity,
                                        duration: 4,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1679591002487-b4d35b856b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMHNoYXJpbmd8ZW58MHx8MHx8fDA%3D"
                                    alt="People sharing food"
                                    className="w-full max-w-xs md:max-w-sm rounded-2xl"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-food-sharing.png';
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PromotionalSection;