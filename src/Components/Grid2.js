import React from "react";

const Grid2 = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 md:-mt-80">
      <div className="col-span-2">{children}</div>
    </div>
  );
};

export default Grid2;
