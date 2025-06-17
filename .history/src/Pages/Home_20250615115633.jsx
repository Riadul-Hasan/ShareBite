import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';
import Additional2 from '../components/additionalSection/Additional2';
import Additional1 from '../components/additionalSection/Additional1';
import { motion } from "motion/react"

const Home = () => {


    const foodPromise = fetch("https://food-sharing-server-khaki.vercel.app/featureFoods").then(res => res.json())

    return (
        <div>
            <HeroSection></HeroSection>
            <motion.div className='container mx-auto py-20'>
                <FeaturedFoods foodPromise={foodPromise}></FeaturedFoods>
            </motion.div>

            <div>
                <Additional2></Additional2>
            </div>
            <div className='py-16'>
                
                <Additional1></Additional1>
            </div>
        </div>
    );
};

export default Home;