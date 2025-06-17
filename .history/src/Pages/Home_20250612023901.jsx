import React, {  useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';

const Home = () => {

    // const [loading, setLoading] = useState(true)
//    useEffect(() => {
//     fetch("https://food-sharing-server-khaki.vercel.app/featureFoods")
//       .then(res => res.json())
//       .then(data => {
//         setFoods(data);
//         setLoading(false);
//       });
//   }, []);

    const foodPromise = fetch("https://food-sharing-server-khaki.vercel.app/featureFoods").then(res => res.json())

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