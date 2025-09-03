import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-2" role="status" aria-label="Loading">
        <div className="w-3 h-3 rounded-full animate-bounce bg-purple-600 dark:bg-cyan-400 transition-colors"></div>
        <div className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.15s] bg-purple-600 dark:bg-cyan-400 transition-colors"></div>
        <div className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.3s] bg-purple-600 dark:bg-cyan-400 transition-colors"></div>
      </div>
      <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
        Enhancing image...
      </span>
    </div>
  );
};

export default Loading;
