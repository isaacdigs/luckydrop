"use client";

import { useState } from 'react';
import Tesseract from 'tesseract.js';
import parseOCR from '../utils/parseOCR';

const UploadForm = ({ setItemAttributes }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => {
      Tesseract.recognize(reader.result, 'eng')
        .then(({ data: { text } }) => {
          console.log('OCR Text:', text);
          const attributes = parseOCR(text);
          setItemAttributes(attributes);
          setLoading(false);
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-1/2 h-full flex flex-col justify-center items-center bg-black text-white">
      <input type="file" onChange={handleImageUpload} />
      {loading && <img src="/loading.gif" alt="Loading" />}
      {image && <img src={image} alt="Uploaded" className="mt-4" />}
      <p>Paste or Upload Item Image</p>
    </div>
  );
};

export default UploadForm;
