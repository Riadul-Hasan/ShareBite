import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedFoods></FeaturedFoods>
        </div>
    );
};

export default Home;