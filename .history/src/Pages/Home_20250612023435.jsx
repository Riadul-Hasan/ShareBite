import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';

const Home = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
   useEffect(() => {
    fetch("http://localhost:3000/featureFoods")
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      });
  }, []);

   if (loading) return <div>Loading...</div>;

    return (
        <div>
            <HeroSection></HeroSection>
            <div className='container mx-auto py-20'>
                <FeaturedFoods foods={foods}></FeaturedFoods>
            </div>
        </div>
    );
};

export default Home;