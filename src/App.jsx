import React, { useState, useEffect } from "react";
import Home from "./Components/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Top Bar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center transition-colors">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Enhance Studio
        </h1>
        <div className="flex items-center gap-4">
          <button className="px-3 py-1 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700 transition">
            New Upload
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 flex justify-center">
        <Home />
      </main>
    </div>
  );
};

export default App;
