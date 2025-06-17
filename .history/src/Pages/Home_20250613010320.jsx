import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedFoods from '../components/featureFood/FeaturedFoods';
import Additional2 from '../components/additionalSection/Additional2';
import Additional1 from '../components/additionalSection/Additional1';

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
                <FeaturedFoods foodPromise={foodPromise}></FeaturedFoods>
            </div>

            <div>
                <Additional2></Additional2>
            </div>
            <div>
                
                <Additional1></Additional1>
            </div>
        </div>
    );
};

export default Home;