import React from "react";
import Body from "../compo/Body";
import Matrix from "../compo/Matrix";
import Download from "../compo/Download";

function Home() {
  return (
    <div className="text-center">
      <Matrix>
        <Body />
        <Download />
      </Matrix>
    </div>
  );
}

export default Home;
