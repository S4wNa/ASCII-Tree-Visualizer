import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWebview } from "@tauri-apps/api/webview";

function Header({ onTreeGenerated }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Configuration du drag & drop Tauri
  useEffect(() => {
    let unlisten;

    const setupDragDrop = async () => {
      try {
        const webview = getCurrentWebview();

        unlisten = await webview.onDragDropEvent((event) => {
          if (event.payload.type === "over") {
            setIsDragging(true);
          } else if (event.payload.type === "drop") {
            setIsDragging(false);
            handleDrop(event.payload.paths);
          } else if (event.payload.type === "cancelled") {
            setIsDragging(false);
          }
        });
      } catch (error) {
        console.error("Erreur drag & drop:", error);
      }
    };

    setupDragDrop();
    return () => unlisten?.();
  }, []);

  const handleDrop = async (paths) => {
    setError(null);
    setIsProcessing(true);

    try {
      if (paths.length > 0) {
        let pathToScan = paths[0];

        // ✅ Si c'est un fichier, prendre son dossier parent
        if (pathToScan.includes(".") && !pathToScan.endsWith("/")) {
          pathToScan = pathToScan.substring(0, pathToScan.lastIndexOf("\\"));
        }

        const result = await invoke("scan_directory", { path: pathToScan });
        onTreeGenerated(result);
      }
    } catch (error) {
      setError("Erreur: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Test du dossier actuel
  const handleTestCurrent = async () => {
    setError(null);
    setIsProcessing(true);

    try {
      const result = await invoke("scan_directory", { path: "." });
      onTreeGenerated(result);
    } catch (error) {
      setError("Erreur: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-center">
      {/* Titre */}
      <h1 className="font-[Tienne] text-5xl py-12 text-[#3be500]">
        ASCII Three Visualizer
      </h1>
      <h1 className="text-3xl text-[#32c700] font-medium mb-8">
        Drag and Drop your files or folders
      </h1>

      {/* Zone de drop */}
      <div className="flex justify-center items-center">
        <div
          className={`w-[440px] h-[200px] rounded-lg border-dashed border-2 ${
            isDragging
              ? "border-white bg-green-800 scale-105"
              : "border-[#3bad00] bg-black"
          } opacity-90 flex flex-col justify-center items-center transition-all duration-200 hover:bg-green-950`}
        >
          {/* Contenu de la zone */}
          <div className="text-center">
            <div className="text-4xl mb-4 text-[#3bad00]">
              {isProcessing ? "⏳" : isDragging ? "📁" : "📂"}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {isProcessing ? "Processing..." : "Drop files or folders here"}
            </h2>
            <h2 className="text-xl font-medium text-white">
              {isDragging ? "Release to scan!" : "Drag anything to analyze"}
            </h2>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="mt-4 p-2 bg-red-500 text-white rounded text-sm max-w-[400px]">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
