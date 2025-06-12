import React from "react";
import { FaWindows } from "react-icons/fa";

function Download() {
  return (
    <div className="flex justify-center items-center p-4 md:p-6 lg:p-8">
      <div className="bg-[#23610e] rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-950 opacity-80 transition-all duration-300 w-full max-w-sm md:max-w-lg lg:max-w-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <svg
                className="text-[#3be500] w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Windows 10/11
              </h3>
            </div>

            <div className="space-y-2 text-white text-sm md:text-base lg:text-lg">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#3be500] text-lg md:text-xl">✓</span>
                64-bit compatible
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#3be500] text-lg md:text-xl">✓</span>
                Quick installation
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#3be500] text-lg md:text-xl">✓</span>
                Size: 1 Ko
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col justify-center items-center w-full md:w-auto">
            <a
              href="/ASCII Tree Visualizer_0.1.0_x64_en-US.msi"
              download="ASCII-Tree-Visualizer.msi"
              className="flex justify-center items-center gap-2 transition-all duration-300 hover:scale-110 cursor-pointer rounded-md bg-[#33960f] hover:bg-[#194608] text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-base md:text-lg lg:text-xl font-semibold shadow-lg hover:shadow-xl"
            >
              <FaWindows className="text-xl md:text-2xl lg:text-3xl" />
              Windows
            </a>
            <p className="text-white text-xs md:text-sm lg:text-base mt-2">
              v1 Quick Simple Safe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
