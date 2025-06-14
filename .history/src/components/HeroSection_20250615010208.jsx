import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Food1 from "../assets/food1.jpg"
import Food2 from "../assets/food2.jpg"




const HeroSection = () => {
    const banners = [
        {
            id: 1,
            image: Food2,
            title: 'Share & Discover Fresh Meals',
            description: 'Join our network to share extra food with neighbors and access free meals in your area',
            buttonText: 'Explore'
        },
        {
            id: 1,
            image: Food1,
            title: 'Nourish Your Community',
            description: 'Every shared meal makes a difference - find or offer fresh food with those around you',
            buttonText: 'Explore'
        }
        // {
        //     id: 2,
        //     image: Garden2,
        //     title: 'Seasonal Planting Guide',
        //     description: 'Learn what to plant this season for a thriving, colorful garden all year round',
        //     buttonText: 'Learn More'
        // },
        // {
        //     id: 3,
        //     image: Garden3,
        //     title: 'Organic Gardening Solutions',
        //     description: 'Natural pest control and fertilizer options for a healthier garden ecosystem',
        //     buttonText: 'Learn More'
        // }
    ];

    return (
        <div className="w-full h-[70vh] md:h-[80vh] bg-gray-100">

            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                className="h-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full h-full">
                            {/* Banner Image */}
                            <img
                                src={banner.image}
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />


                            <div className="absolute inset-0 bg-black/30" />

                            {/* Banner Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl">
                                    {banner.title}
                                </h1>
                                <p className="text-lg md:text-xl mb-8 max-w-xl">
                                    {banner.description}
                                </p>
                                <button className="bg-green-600 hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-lg text-lg font-medium">
                                    {banner.buttonText}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;