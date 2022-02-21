import React from "react";

const Container = ({ children }) => {
  return (
    <div className="bg-[#202124] h-full-screen text-white pt-10 font-roboto">
      <div className="max-w-7xl mx-auto px-3 lg:px-0">{children}</div>
    </div>
  );
};

export default Container;
