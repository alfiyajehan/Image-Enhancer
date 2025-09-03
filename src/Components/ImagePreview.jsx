import React from "react";
import Loading from "./Loading";

const ImagePreview = ({ uploadImage, enhancedImage, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-h-[20em] transition-colors">
      {/* Original */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden transition-colors">
        <h4 className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-center p-2 font-semibold transition-colors">
          Original Image
        </h4>
        {uploadImage ? (
          <img src={uploadImage} alt="Original" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 transition-colors">
            No image selected
          </div>
        )}
      </div>

      {/* Enhanced */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden transition-colors">
        <h4 className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-center p-2 font-semibold transition-colors">
          Enhanced Image
        </h4>
        {loading ? (
          <Loading />
        ) : enhancedImage ? (
          <img src={enhancedImage} alt="Enhanced" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 transition-colors">
            No enhanced image
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
