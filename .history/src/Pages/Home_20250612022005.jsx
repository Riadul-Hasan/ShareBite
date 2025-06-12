import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <div className='container mx-auto py-20'>
                <FeaturedFoods></FeaturedFoods>
            </div>
        </div>
    );
};

export default Home;