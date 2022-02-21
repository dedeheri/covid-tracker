import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import moment from "moment";

const Filter = ({ day, setDay, days }) => {
  return (
    <div className="w-56">
      <div className="flex items-center space-x-2">
        <h1>Dalam : </h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border border-[#404040]">
              {day !== "all"
                ? day.k === undefined
                  ? "7 Hari"
                  : day.k
                : "Total"}
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-[#404040] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {Object.entries(days).map(([k, v], i) => (
                  <Menu.Item key={i}>
                    <button
                      onClick={() => setDay({ v, k })}
                      className="text-white hover:bg-[#2c2b2b] flex rounded-md items-center w-full px-2 py-2 text-sm"
                    >
                      {k == "all" ? "Total" : k}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Filter;