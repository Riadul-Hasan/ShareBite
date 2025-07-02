import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ food }) => {
    const { foodImage, foodName, additionalNotes, donorEmail, expiredDateTime, pickupLocation, quantity } = food;

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        hover: {
            y: -6,
            scale: 1.02,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-orange-100 flex flex-col h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <motion.img
                    src={foodImage || '/placeholder-food.jpg'}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    onError={(e) => { e.target.src = '/placeholder-food.jpg'; }}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h2 className="text-lg font-semibold text-white line-clamp-1">{foodName}</h2>
                </div>
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {quantity} Left
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-4 flex-grow">
                <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold text-orange-500">Expires:</span> {expiredDateTime}</p>
                    <p><span className="font-semibold text-orange-500">Location:</span> {pickupLocation}</p>
                    <p className="truncate"><span className="font-semibold text-orange-500">Donor:</span> {donorEmail}</p>
                    {additionalNotes && (
                        <p className="text-gray-500 italic line-clamp-2">"{additionalNotes}"</p>
                    )}
                </div>

                <motion.button
                    className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-transform hover:scale-[1.02] relative overflow-hidden"
                    whileTap={{ scale: 0.97 }}
                >
                    See More →
                </motion.button>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
