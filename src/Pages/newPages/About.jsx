import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import ThemeToggle from '../../components/themeToggle/ThemeToggle';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Image URLs from placeholder services
    const heroImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
    const missionImage = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGh1bWFuaXR5fGVufDB8fDB8fHww';
    const teamImages = [
        'https://images.unsplash.com/photo-1631034527597-2d46ad65e09c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VudGVsbWFufGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW58ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren",
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const stats = [
        { value: 300, label: "Meals Shared Daily" },
        { value: 5000, label: "Community Members" },
        { value: 50, label: "Partner Organizations" },
        { value: 10000, label: "Lives Impacted" },
    ];

    const teamMembers = [
        { name: "Alex Johnson", role: "Founder", image: teamImages[0] },
        { name: "Sarah Williams", role: "Community Lead", image: teamImages[1] },
        { name: "Michael Chen", role: "Tech Lead", image: teamImages[2] },
    ];

    return (
        <div className="bg-orange-50 dark:bg-gray-900">
            {/* Hero Section */}
            <ThemeToggle />

            <motion.section
                className="relative py-32 px-4 text-center bg-gray-900 text-white dark:bg-gray-900 dark:text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-6 dark:text-white"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 dark:text-gray-300"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Connecting communities through the power of food sharing
                    </motion.p>
                    <motion.button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg dark:hover:bg-orange-400"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Our Movement
                    </motion.button>
                </div>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto dark:bg-gray-800"
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={itemVariants}>
                    <motion.div className="rounded-xl overflow-hidden shadow-xl" whileHover={{ scale: 1.02 }}>
                        <img
                            src={missionImage}
                            alt="Our mission"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Our Mission</h2>
                        <p className="text-gray-600 mb-6 text-lg dark:text-gray-300">
                            We're on a mission to reduce food waste by connecting surplus food with people who need it.
                            Our platform makes food sharing simple, safe, and rewarding for everyone involved.
                        </p>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => null)}{/* replaced below with actual motion.divs */}
                            <motion.div className="flex items-start" whileHover={{ x: 5 }}>
                                <div className="bg-orange-100 p-2 rounded-full mr-4 dark:bg-orange-800">
                                    <svg
                                        className="w-6 h-6 text-orange-500 dark:text-orange-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">Reduce food waste in local communities</p>
                            </motion.div>
                            <motion.div className="flex items-start" whileHover={{ x: 5 }}>
                                <div className="bg-orange-100 p-2 rounded-full mr-4 dark:bg-orange-800">
                                    <svg
                                        className="w-6 h-6 text-orange-500 dark:text-orange-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">Build connections between neighbors</p>
                            </motion.div>
                            <motion.div className="flex items-start" whileHover={{ x: 5 }}>
                                <div className="bg-orange-100 p-2 rounded-full mr-4 dark:bg-orange-800">
                                    <svg
                                        className="w-6 h-6 text-orange-500 dark:text-orange-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">Ensure food safety and quality standards</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Our Impact</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
                            Numbers that tell the story of our growing community
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-orange-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-5xl font-bold text-orange-600 mb-2 dark:text-orange-400">
                                    <CountUp end={stat.value} duration={2.5} separator="," />
                                    {stat.value >= 1000 && '+'}
                                </p>
                                <p className="text-gray-600 font-medium dark:text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="text-center mb-16"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Meet The Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
                        The passionate people behind our food sharing community
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow dark:bg-gray-700"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                        >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1 dark:text-white">{member.name}</h3>
                                <p className="text-orange-500 font-medium dark:text-orange-400">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>

    );
};

export default About;