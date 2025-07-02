import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaClock, FaTwitter, FaYoutube, FaFacebook, FaUtensils } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaTwitter />, url: 'https://x.com/act_like_riadul' },
        { icon: <FaYoutube />, url: 'https://www.youtube.com/@ProgrammingHeroCommunity' },
        { icon: <FaFacebook />, url: 'https://www.facebook.com/riad.hasan.39142072/' }
    ];

    return (
        <footer className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 text-amber-50 py-12 px-4 border-t-4 border-amber-700">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
            >
                {/* Branding */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3"
                >
                    <FaUtensils className="text-3xl text-amber-200" />
                    <div>
                        <h3 className="text-2xl font-bold text-white">Share<span className="text-amber-200">Bite</span></h3>
                        <p className="text-amber-100 text-sm">Nourishing communities together</p>
                    </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-2 text-center md:text-left"
                >
                    <h3 className="text-lg font-semibold mb-3 text-amber-100">Get in Touch</h3>
                    <div className="flex items-center gap-3 text-amber-50">
                        <FaEnvelope className="text-amber-200" />
                        <a href="mailto:riadb368@gmail.com" className="hover:text-white transition-colors">
                            riadb368@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3 text-amber-50">
                        <FaPhone className="text-amber-200" />
                        <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-amber-50">
                        <FaClock className="text-amber-200" />
                        <span>Mon-Fri: 9am-5pm</span>
                    </div>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                >
                    <h3 className="text-lg font-semibold mb-4 text-amber-100">Connect With Us</h3>
                    <div className="flex gap-5">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                    y: -5,
                                    color: '#fef3c7',
                                    scale: 1.2
                                }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="text-xl text-amber-100 hover:text-white transition-colors"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Copyright */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-12 pt-6 border-t border-amber-700 text-amber-100 text-sm"
            >
                © {new Date().getFullYear()} Share Bite. All rights reserved.
            </motion.div>
        </footer>
    );
};

export default Footer;