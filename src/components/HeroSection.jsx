import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import Food1 from "../assets/food1.jpg";
import Food2 from "../assets/food2.jpg";
import { FaUtensils, FaLeaf, FaHeart, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const HeroSection = () => {
    const banners = [
        {
            id: 1,
            image: Food2,
            title: 'Share & Discover Fresh Meals',
            description: 'Join our network to share extra food with neighbors and access free meals in your area',
            buttonText: 'Explore Now',
            buttonColor: 'bg-orange-500 hover:bg-orange-600'
        },
        {
            id: 2,
            image: Food1,
            title: 'Nourish Your Community',
            description: 'Every shared meal makes a difference - find or offer fresh food with those around you',
            buttonText: 'Get Started',
            buttonColor: 'bg-orange-400 hover:bg-orange-500'
        }
    ];

    // Animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
        hover: {
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255,165,0,0.4)"
        },
        tap: { scale: 0.95 }
    };

    const bgImageVariants = {
        zoom: {
            scale: 1.1,
            transition: {
                duration: 10,
                ease: "linear"
            }
        }
    };

    const floatingIcons = [
        { icon: <FaUtensils className="text-orange-300/50" size={24} />, x: 10, y: 20, delay: 0 },
        { icon: <FaLeaf className="text-green-300/50" size={24} />, x: 85, y: 30, delay: 0.5 },
        { icon: <FaHeart className="text-red-300/50" size={24} />, x: 50, y: 80, delay: 1 }
    ];

    return (
        <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                spaceBetween={0}
                effect={'fade'}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.hero-pagination',
                }}
                className="h-full w-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full h-full">
                            {/* Animated Background Image */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden"
                                variants={bgImageVariants}
                                animate="zoom"
                            >
                                <img
                                    src={banner.image}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay" />

                            {/* Floating Animated Icons */}
                            {floatingIcons.map((item, index) => (
                                <motion.div
                                    key={`icon-${banner.id}-${index}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [item.y + 50, item.y, item.y - 50],
                                        x: [item.x, item.x + 5, item.x]
                                    }}
                                    transition={{
                                        duration: 15,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear"
                                    }}
                                    className="absolute"
                                    style={{
                                        left: `${item.x}%`,
                                        top: `${item.y}%`
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                            ))}

                            {/* Banner Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={textVariants}
                                    className="max-w-4xl w-full space-y-6 relative z-10"
                                >
                                    <motion.h1
                                        className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg"
                                        variants={textVariants}
                                    >
                                        {banner.title}
                                    </motion.h1>
                                    <motion.p
                                        className="text-lg md:text-xl max-w-xl mx-auto drop-shadow-md"
                                        variants={textVariants}
                                    >
                                        {banner.description}
                                    </motion.p>
                                    <motion.div
                                        variants={textVariants}
                                        className="flex justify-center"
                                    >
                                        <Link to="/availableFoods">
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className={`${banner.buttonColor} text-white rounded-full px-8 py-3 text-lg font-semibold border-2 border-white/30 flex items-center gap-2 transition-all`}
                                            >
                                                {banner.buttonText}
                                                <FaArrowRight className="text-sm" />
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination with orange bullets */}
            <style jsx global>{`
                .hero-pagination .swiper-pagination-bullet {
                    background: rgba(255, 165, 0, 0.5);
                    width: 10px;
                    height: 10px;
                    margin: 0 5px;
                    transition: all 0.3s ease;
                }
                .hero-pagination .swiper-pagination-bullet-active {
                    background: rgb(255, 165, 0);
                    width: 12px;
                    height: 12px;
                }
            `}</style>
            <div className="hero-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10" />

            {/* Scroll indicator (orange) */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-8 h-12 rounded-full border-2 border-orange-400/50 flex justify-center p-1">
                    <motion.div
                        className="w-2 h-2 bg-orange-400 rounded-full"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;