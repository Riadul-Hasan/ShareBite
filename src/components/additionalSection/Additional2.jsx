import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import your images
import Food1 from '../../assets/food1.jpg';
import Food2 from '../../assets/food2.jpg';
import Food3 from '../../assets/food3.jpg';
import { Link } from 'react-router';

const slides = [
  // {
  //   image: Food1,
  //   title: "Share Meals, Spread Hope",
  //   subtitle: "Join our movement to rescue good food from going to waste",
  //   highlight: "Hope"
  // },
  // {
  //   image: Food2,
  //   title: "Nourish Your Community",
  //   subtitle: "Connect through the simple act of sharing what you have",
  //   highlight: "Community"
  // },
  {
    image: Food3,
    title: "Reduce Waste, Share Joy",
    subtitle: "Turn surplus food into opportunities for connection",
    highlight: "Joy"
  }
];

const Additional2 = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active'
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image with Motion */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: 'linear' }}
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  className="text-center px-6 py-12 backdrop-blur-sm bg-white/10 rounded-xl mx-4 lg:mx-0 lg:w-2/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.h1
                    className="mb-5 text-3xl lg:text-4xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {slide.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word === slide.highlight ? (
                          <motion.span
                            className="text-orange-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            {word}{' '}
                          </motion.span>
                        ) : (
                          word + ' '
                        )}
                      </React.Fragment>
                    ))}
                  </motion.h1>

                  <motion.p
                    className="mb-8 text-blue-100 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Link to="/addFoods"> <motion.button
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium shadow-lg hover:shadow-amber-300/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore
                    </motion.button></Link>
                    <Link to="/about">
                      <motion.button
                        className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10" />

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Additional2;