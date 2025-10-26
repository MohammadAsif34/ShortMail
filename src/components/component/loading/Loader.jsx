import React from "react";
import Loader2 from "./Loader2";

const Loader = () => {
  return (
    <section className="w-screen  h-screen flex justify-center items-center">
      <div className="flex items-center gap-2">
        <p className="text-xl leading-4 tracking-[5px]">Loading</p>
        <Loader2 />
      </div>
    </section>
  );
};

export default Loader;
