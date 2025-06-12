import React, { useState } from "react";
import Body from "../compo/Body";
import Header from "../compo/Header";
import Matrix from "../compo/Matrix";

function Home() {
  const [asciiTree, setAsciiTree] = useState(null);

  const handleTreeGenerated = (tree) => {
    console.log("🌳 Arbre reçu:", tree);
    setAsciiTree(tree);
  };

  return (
    <div className="w-full min-h-screen text-center">
      <Matrix>
        <Header onTreeGenerated={handleTreeGenerated} />
        <Body asciiTree={asciiTree} setAsciiTree={setAsciiTree} />
      </Matrix>
    </div>
  );
}

export default Home;
