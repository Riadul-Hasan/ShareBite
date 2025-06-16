import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Food1 from "../assets/food1.jpg"
import Food2 from "../assets/food2.jpg"
import Food3 from "../assets/food3.jpg"




const HeroSection = () => {
    const banners = [
        {
            id: 1,
            image: Food3,
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
                                <button className="btn bg-transparent text-white">
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