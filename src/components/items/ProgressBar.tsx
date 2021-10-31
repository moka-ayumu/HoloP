import React from "react";

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="w-full h-1 bg-gray-300 m-auto overflow-hidden block transition-all duration-75 ease-linear">
      <div
        className="h-4 bg-green-400 mix-blend-overlay"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
}

export default ProgressBar;
