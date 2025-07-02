import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaTags, FaShareAlt, FaHeart } from 'react-icons/fa';

const BlogPage = () => {
    // Sample blog data
    const featuredPost = {
        id: 1,
        title: "The Future of Sustainable Food Sharing",
        excerpt: "How technology is transforming how we share surplus food and reduce waste in urban communities.",
        author: "Riadul Islam",
        date: "May 15, 2023",
        readTime: "8 min read",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8fDA%3D"
    };

    const blogPosts = [
        {
            id: 2,
            title: "5 Ways to Reduce Food Waste in Your Community",
            excerpt: "Practical tips anyone can implement to make a difference starting today.",
            author: "Sarah Johnson",
            date: "April 28, 2023",
            readTime: "5 min read",
            category: "Tips"
        },
        {
            id: 3,
            title: "Cultural Connections Through Shared Meals",
            excerpt: "How food sharing builds bridges between diverse communities.",
            author: "Miguel Rodriguez",
            date: "April 10, 2023",
            readTime: "6 min read",
            category: "Culture"
        },
        {
            id: 4,
            title: "The Psychology Behind Food Sharing",
            excerpt: "Why sharing meals creates stronger social bonds than almost any other activity.",
            author: "Dr. Emily Chen",
            date: "March 22, 2023",
            readTime: "10 min read",
            category: "Psychology"
        },
        {
            id: 5,
            title: "Urban Farming and Food Sharing Initiatives",
            excerpt: "How city dwellers are growing and sharing food in unexpected places.",
            author: "Jamal Williams",
            date: "March 15, 2023",
            readTime: "7 min read",
            category: "Urban Farming"
        },
        {
            id: 6,
            title: "Preserving Traditions Through Recipe Sharing",
            excerpt: "The importance of passing down culinary knowledge through generations.",
            author: "Priya Patel",
            date: "February 28, 2023",
            readTime: "9 min read",
            category: "Traditions"
        }
    ];

    const categories = [
        "All Topics",
        "Sustainability",
        "Recipes",
        "Community",
        "Technology",
        "Culture",
        "Tips"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50"
        >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 py-20 px-6 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Share Bite Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Nourishing minds with insights about food sharing, sustainability, and community building
                    </p>
                </motion.div>
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20"
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:w-1/4 space-y-8"
                    >
                        {/* Search */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Search</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map((category, index) => (
                                    <motion.li
                                        whileHover={{ x: 5 }}
                                        key={index}
                                        className="cursor-pointer text-gray-600 hover:text-amber-600 transition-colors"
                                    >
                                        {category}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-xl shadow-lg text-white"
                        >
                            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                            <p className="text-amber-100 mb-4">Get our latest articles delivered to your inbox</p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 rounded-lg bg-amber-400/20 border border-amber-300 placeholder-amber-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="w-full bg-white text-amber-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Blog Content */}
                    <div className="lg:w-3/4">
                        {/* Featured Post */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-12"
                        >
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="md:flex">
                                    <div className="md:w-1/2">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-8 md:w-1/2">
                                        <div className="uppercase tracking-wide text-sm text-amber-600 font-semibold mb-1">
                                            Featured • {featuredPost.category}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{featuredPost.title}</h2>
                                        <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                                        <div className="flex items-center text-sm text-gray-500 mb-6">
                                            <FaUser className="mr-1" />
                                            <span className="mr-4">{featuredPost.author}</span>
                                            <FaCalendarAlt className="mr-1" />
                                            <span>{featuredPost.date}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                                            >
                                                Read More
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Blog Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {blogPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <FaUser className="mr-1" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex space-x-3 text-gray-400">
                                                <button className="hover:text-amber-500 transition-colors">
                                                    <FaHeart />
                                                </button>
                                                <button className="hover:text-amber-500 transition-colors">
                                                    <FaShareAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center mt-12"
                        >
                            <nav className="flex items-center space-x-2">
                                <button className="px-3 py-1 rounded-lg bg-amber-500 text-white">1</button>
                                <button className="px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors">2</button>
                                <button className="px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors">3</button>
                                <span className="px-2">...</span>
                                <button className="px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors">Next</button>
                            </nav>
                        </motion.div> */}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPage;