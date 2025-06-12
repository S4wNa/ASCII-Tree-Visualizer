import React from "react";
import { FaWindows } from "react-icons/fa";

function Body({ asciiTree, setAsciiTree }) {
  const handleClear = () => {
    setAsciiTree(null);
  };

  const handleCopy = () => {
    if (asciiTree) {
      navigator.clipboard.writeText(asciiTree);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-8">
        <div className="w-[720px] h-[800px] max-h-[80vh] border-2 border-[#3bad00] bg-black opacity-90 rounded-lg overflow-auto">
          {asciiTree ? (
            <pre className="text-sm font-mono text-white text-left whitespace-pre-wrap p-4">
              {asciiTree}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-white text-lg">
              Your ASCII tree should pop up here
            </div>
          )}
        </div>
        <div className="ml-4">
          <p className="w-[140px] m-4 font-medium text-white text-left">
            Little Disclaimer, add a gitignore. to filter automatically
          </p>
          <button
            onClick={handleClear}
            className="rounded-lg w-[120px] h-[60px] bg-[#2d8a00] flex items-center justify-center m-4 text-[#f6f3ff] font-bold cursor-pointer hover:bg-green-800 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg w-[120px] h-[60px] border-2 border-[#3bad00] flex items-center justify-center m-4 text-[#3bad00] font-medium cursor-pointer hover:bg-green-800 hover:text-white transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Body;
