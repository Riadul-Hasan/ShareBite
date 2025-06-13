import React from 'react';
import { useLoaderData } from 'react-router';

const ManageMyFoods = () => {
    const data = useLoaderData()
    console.log(data)
    
    return (
        <div>
          {
            data.map(singleData => <p>{singleData.name}</p>)
          }
        </div>

        
    );
};

export default ManageMyFoods;