import React from 'react';
import { Link } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import { FcExpired } from 'react-icons/fc';
import { TbFileDescription } from "react-icons/tb";
import { motion } from 'framer-motion';

const AvailableFoodCard = ({ food }) => {
  const { name, foodUrl, quantity, location, notes, dateTime, _id } = food;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
    >
      {/* Image with hover zoom effect */}
      <motion.figure
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={foodUrl || '/placeholder-food.jpg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => e.target.src = '/placeholder-food.jpg'}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>

        {/* Food name */}
        <motion.h2
          className="absolute bottom-4 left-4 text-xl font-bold text-white"
          whileHover={{ x: 5 }}
        >
          {name}
        </motion.h2>

        {/* Quantity badge */}
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {quantity} available
        </motion.div>
      </motion.figure>

      {/* Card content */}
      <div className="p-5 space-y-4">
        {/* Location */}
        <motion.div
          className="flex items-center text-sm text-gray-600"
          whileHover={{ x: 3 }}
        >
          <FaLocationDot className="text-amber-500 mr-2 text-base" />
          <span className="truncate">{location}</span>
        </motion.div>

        {/* Expiration */}
        <motion.div
          className="flex items-center text-sm text-gray-600"
          whileHover={{ x: 3 }}
        >
          <FcExpired className="mr-2 text-base" />
          <span>Expires: {new Date(dateTime).toLocaleDateString()}</span>
        </motion.div>

        {/* Notes */}
        {notes && (
          <motion.div
            className="text-sm text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className='flex gap-2 items-start'>
              <TbFileDescription className="text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{notes}</span>
            </div>
          </motion.div>
        )}

        {/* View Details Button */}
        <motion.div
          className="card-actions justify-end pt-3"
          whileHover={{ scale: 1.02 }}
        >
          <Link to={`/singleFood/${_id}`}>
            <motion.button
              className="btn rounded-full px-6 bg-gradient-to-r from-amber-500 to-amber-600 border-none text-white shadow-md hover:shadow-lg"
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #f59e0b, #d97706)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              View Details
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AvailableFoodCard;