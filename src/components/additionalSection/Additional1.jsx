import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

import { FcCustomerSupport } from "react-icons/fc";
import { FaPeopleCarry } from 'react-icons/fa';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { GoOrganization } from 'react-icons/go';

const stats = [
    {
        id: 1,
        icon: <BiSolidDonateBlood size={30} />,
        count: 300,
        label: "Donations Completed",
        bg: "from-orange-400 to-orange-500",
        text: "text-orange-500"
    },
    {
        id: 2,
        icon: <FaPeopleCarry size={30} />,
        count: 6500,
        label: "People Reached",
        bg: "from-amber-400 to-orange-400",
        text: "text-amber-500"
    },
    {
        id: 3,
        icon: <GoOrganization size={28} />,
        count: 50,
        label: "Organizations",
        bg: "from-lime-400 to-green-400",
        text: "text-green-500"
    },
    {
        id: 4,
        icon: <FcCustomerSupport size={32} />,
        count: 20000,
        label: "Positive Feedbacks",
        bg: "from-gray-400 to-gray-500",
        text: "text-gray-600"
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }),
    hover: {
        y: -8,
        scale: 1.03,
        boxShadow: "0 20px 30px -10px rgba(251, 146, 60, 0.3)"
    }
};

const Additional1 = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-12'>
            <h2 className='text-center text-4xl font-bold text-orange-600 mb-10'>
                Our Valuable Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col items-center justify-center h-full cursor-pointer"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        custom={index}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className={`bg-gradient-to-br ${item.bg} text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md`}
                            whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {item.icon}
                        </motion.div>
                        <h3 className={`text-4xl font-bold ${item.text}`}>
                            <CountUp start={0} end={item.count} duration={4} separator="," />+
                        </h3>
                        <p className="text-center text-base font-semibold text-gray-600 mt-2">
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Additional1;
