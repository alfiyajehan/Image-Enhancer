import React from "react";

const ImageUpload = ({ uploadImageHandler }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageHandler(file);
      e.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImageHandler(file);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="upload"
        onChange={handleFileChange}
      />
      <label htmlFor="upload" className="text-center cursor-pointer">
        <div className="text-gray-600 dark:text-gray-300 transition-colors">
          Drag & drop an image here or click to browse
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 transition-colors">
          Supported: JPG, PNG up to 10MB
        </p>
      </label>
    </div>
  );
};

export default ImageUpload;
