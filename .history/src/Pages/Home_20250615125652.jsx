import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';
import Additional2 from '../components/additionalSection/Additional2';
import Additional1 from '../components/additionalSection/Additional1';
import { motion } from "motion/react"

const Home = () => {


    const foodPromise = fetch("http://localhost:3000/featureFoods").then(res => res.json())

    return (
        <div>
            <HeroSection></HeroSection>
            <motion.div 
             initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 4 }}

            className='container mx-auto py-20'>
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