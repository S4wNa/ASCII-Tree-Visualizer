import React from "react";

function Body() {
  return (
    <div>
      <h1 className="font-[Tienne] text-5xl py-12 text-[#3be500]">
        ASCII Tree Visualizer
      </h1>
      <div className="flex justify-center items-center">
        <video
          controls
          width="640"
          className="rounded-lg md:w-[800px] md:h-[350px] "
        >
          <source
            src="https://github.com/S4wNa/ASCII-Tree-Visualizer/releases/download/video/video.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="bg-red-100 w-40 flex jsutify-center items-center"></div>
    </div>
  );
}

export default Body;
