import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div
      className="
        h-screen w-screen flex flex-col justify-center items-center 
        bg-neutral-950 
        text-white
        space-y-6 
      "
    >
      <LoaderCircle
        size={64}
        strokeWidth={3}
        className="
          animate-spin 
          text-purple-400
          filter drop-shadow-lg
          transition-colors duration-500
        "
        style={{
          filter: "drop-shadow(0 0 10px rgba(192, 132, 252, 0.8))",
        }}
      />

      <p
        className="
          mt-6 text-2xl font-light text-purple-200 
          animate-pulse 
          tracking-widest 
        "
      >
        FETCHING DATA FROM NASA...
      </p>
    </div>
  );
};

export default Loader;