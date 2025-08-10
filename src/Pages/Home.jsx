import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';
import Additional2 from '../components/additionalSection/Additional2';
import Additional1 from '../components/additionalSection/Additional1';
import BlogSection from '../newSection/BlogSection';
import NewsletterSection from '../newSection/NewsletterSection';
import PromotionalSection from '../newSection/PromotionalSection';

const Home = () => {


    const foodPromise = fetch("https://food-sharing-server-khaki.vercel.app/featureFoods").then(res => res.json())

    return (
        <div>
            <HeroSection></HeroSection>
            <div className='bg-gradient-to-b from-orange-50 to-white dark:from-stone-900 dark:to-stone-800'>
                <div className='container mx-auto py-20'>
                    <FeaturedFoods foodPromise={foodPromise}></FeaturedFoods>
                </div>
            </div>
            <BlogSection></BlogSection>
            <PromotionalSection></PromotionalSection>
            <div>
                <Additional2></Additional2>
            </div>
            {/* <div className='py-16 dark:bg-stone-900'>
                <Additional1 className="dark:bg-stone-800" />
            </div> */}
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;