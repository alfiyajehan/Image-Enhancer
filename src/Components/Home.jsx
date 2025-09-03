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

      // extract image URL from API result
      const imageUrl =
        result.image || result.url || result.output || result.data?.image;
      setEnhancedImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Image enhancement failed. Please try again.");
      setEnhancedImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          AI Photo Enhancement
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload a photo and instantly preview the AI-enhanced result side by
          side. Clean, modern, and effortless.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Enhance
          </button>
        </div>
      </section>

      {/* Controls Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Upload */}
        <ImageUpload uploadImageHandler={uploadImageHandler} />

        {/* Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 transition-colors">
          {["Style", "Sharpness", "Denoise", "Color Boost"].map((label, idx) => (
            <div key={idx}>
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                {label}
              </label>
              <input
                type="text"
                defaultValue={
                  label === "Style"
                    ? "Auto"
                    : label === "Sharpness"
                    ? "Medium"
                    : label === "Denoise"
                    ? "Balanced"
                    : "Natural"
                }
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200 transition-colors"
              />
            </div>
          ))}

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Enhance
            </button>
            {enhancedImage && (
              <a
                href={enhancedImage}
                download="enhanced.jpg"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Download
              </a>
            )}
          </div>
        </div>

        {/* Face Enhance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 transition-colors">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Face Enhance
            </label>
            <select className="w-full p-2 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200 transition-colors">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Artifact Fix
            </label>
            <select className="w-full p-2 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200 transition-colors">
              <option>Auto</option>
              <option>Low</option>
              <option>High</option>
            </select>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section>
        <h3 className="text-center text-sm text-purple-600 font-medium mb-2">
          Side-by-side Preview
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
