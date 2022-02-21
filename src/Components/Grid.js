import React from "react";

const Grid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0 md:gap-5">
      {children}
    </div>
  );
};

export default Grid;
