"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';
import ItemForm from '../components/ItemForm';

const Home = () => {
  const [itemAttributes, setItemAttributes] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <UploadForm setItemAttributes={setItemAttributes} />
        {itemAttributes ? (
          <ItemForm itemAttributes={itemAttributes} />
        ) : (
          <div className="w-1/2 h-full flex items-center justify-center">
            <h2>Item Information</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
