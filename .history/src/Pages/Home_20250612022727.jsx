import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';

const Home = () => {
    const featurePromise = fetch("https://food-sharing-server-khaki.vercel.app/featureFoods").then(res => res.json())
    return (
        <div>
            <HeroSection></HeroSection>
            <div className='container mx-auto py-20'>
                <FeaturedFoods featurePromise={featurePromise}></FeaturedFoods>
            </div>
        </div>
    );
};

export default Home;