import React, { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { enhancedImageApi } from "../Utils/enhancedImageApi";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = async (file) => {
    const url = URL.createObjectURL(file);
    setUploadImage(url);

    setLoading(true);
    try {
      const result = await enhancedImageApi(file);
      if (!result) throw new Error("Enhancement failed");
      const imageUrl = result.image || result.url || result.output || result.data?.image;
      setEnhancedImage(imageUrl);
    } 
    catch (error) {
      console.error(error);
      alert("Image enhancement failed. Please try again.");
      setEnhancedImage(null);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col text-center gap-6">
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          AI Photo Enhancement
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-5">
          Upload a photo and instantly preview the AI-enhanced result side by
          side. Clean, modern, and effortless.
        </p>
      </section>
      <section className="relative top-1/9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[20em] max-w-[70%]">
        <ImageUpload uploadImageHandler={uploadImageHandler} />
      </section>
      <section>
        <h3 className="text-center text-2xl font-semibold text-purple-600 m-4">
          Preview Mode
        </h3>
        <ImagePreview
          uploadImage={uploadImage}
          enhancedImage={enhancedImage}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default Home;
