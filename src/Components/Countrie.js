import React from "react";

import CountUp from "react-countup";
import ThreeDots from "react-loading-icons/dist/components/three-dots";

const Countrie = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <ThreeDots fill="#606060" />
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-[#404040] rounded-xl p-5 h-80 md:h-[40rem]">
      <h1 className="font-medium text-[#ADADAD] mb-4">
        Kasus bersadarkan negara
      </h1>
      <div className="scrollbar-hide overflow-auto">
        {Object.values(data).map((data) => (
          <div key={data.cases} className="flex justify-between space-y-2">
            {/* countiers */}
            <div className="flex space-x-3">
              <img
                alt="flag"
                src={data.countrieInfo.flag}
                className="h-6 w-6 rounded-full"
              />
              <p>{data.countrieName}</p>
            </div>

            {/* number cases */}
            <CountUp end={data.cases} duration={2} separator={","} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countrie;
