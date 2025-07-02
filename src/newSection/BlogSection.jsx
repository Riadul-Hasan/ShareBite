import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlogSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const blogPosts = [
        {
            id: 1,
            title: "How to Reduce Food Waste in Your Community",
            excerpt: "Discover practical tips for sharing excess food and reducing waste in your neighborhood.",
            image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            date: "June 15, 2023",
            readTime: "4 min read"
        },
        {
            id: 2,
            title: "The Environmental Impact of Food Sharing",
            excerpt: "Learn how sharing food can significantly reduce your carbon footprint and help the planet.",
            image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
            date: "May 28, 2023",
            readTime: "6 min read"
        },
        {
            id: 3,
            title: "Building Stronger Communities Through Food Sharing",
            excerpt: "How food sharing platforms are bringing neighbors together and creating meaningful connections.",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            date: "April 10, 2023",
            readTime: "5 min read"
        }
    ];

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

    const cardHoverVariants = {
        hover: {
            y: -10,
            boxShadow: "0 15px 30px -5px rgba(255, 105, 0, 0.3)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const imageHoverVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white" id="blog">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold text-gray-900 mb-4"
                    >
                        Latest From Our Blog
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Discover tips, stories, and insights about food sharing and community building
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <motion.div
                                className="relative h-56 overflow-hidden"
                                variants={imageHoverVariants}
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <span className="text-sm text-white">{post.date}</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="p-6"
                                whileHover={{
                                    backgroundColor: "rgba(255, 247, 237, 0.5)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-orange-500">{post.readTime}</span>
                                    <motion.button
                                        className="text-orange-600 font-medium flex items-center"
                                        whileHover={{ x: 5 }}
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-8 rounded-full font-semibold shadow-md"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(255, 105, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Blog Posts
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogSection;