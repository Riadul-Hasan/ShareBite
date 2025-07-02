import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                        {/* Visual Element */}
                        <motion.div
                            className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl p-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    transition: {
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="mb-5"
                            >
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white text-center mb-2">Join Our Community</h3>
                            <p className="text-orange-100 text-center">Get fresh updates delivered weekly</p>
                        </motion.div>

                        {/* Form Area */}
                        <div className="flex-1">
                            {!submitted ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay Updated</h3>
                                    <p className="text-gray-600 mb-6">Subscribe for food sharing tips and community news.</p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                                placeholder="Your email address"
                                                required
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-orange-200 transition-all"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Subscribe Now
                                        </motion.button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="h-full flex flex-col items-center justify-center text-center p-4"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">You're Subscribed!</h3>
                                    <p className="text-gray-600 mb-4">Thank you for joining our community.</p>
                                    <motion.button
                                        onClick={() => setSubmitted(false)}
                                        className="text-orange-500 font-medium text-sm"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Back to form
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;