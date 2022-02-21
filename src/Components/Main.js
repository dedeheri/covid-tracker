import React, { Fragment } from "react";

import CountUp from "react-countup";
import moment from "moment";

import LoadingText from "./LoadingText";

import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
export const Main = ({
  loading,
  total,
  countries,
  countrie,
  setCountrie,
  children,
}) => {
  return (
    <div className="col-span-2 space-y-5">
      <div className="border border-[#404040] px-4 py-3 md:px-10 md:py-5 rounded-xl w-auto">
        <div className="flex space-x-3 ">
          <h1 className="mt-3">Lokasi </h1>
          <Listbox value={countrie} onChange={setCountrie}>
            <div className="relative w-1/2">
              <Listbox.Button className="cursor-pointer relative w-full py-2 pl-3 border border-[#404040] pr-10 text-left  rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={countrie?.countrieInfo?.flag}
                    alt="contrie"
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <span className="ml-3 block truncate">
                    {countrie.countrieName}
                  </span>
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full bg-[#282828] py-1 mt-1 scrollbar-hide overflow-auto text-base rounded-md shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {Object.values(countries)?.map((countries, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `${active ? "text-white bg-[#404040]" : "text-white"}
                          cursor-pointer select-none relative py-2 pl-4 pr-4 `
                      }
                      value={countries}
                    >
                      {({ countrie }) => (
                        <>
                          <div className="flex items-center space-x-3">
                            <img
                              src={countries.countrieInfo.flag}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span
                              className={`${
                                countrie ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {countries.countrieName}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="space-y-1 mt-10 ">
          <h1 className="font-base text-[#ADADAD]">Total Kasus</h1>
          <div className="text-lg sm:text-xl md:text-3xl font-semibold">
            {loading ? (
              <LoadingText />
            ) : (
              <CountUp end={total?.cases} separator={","} duration={1} />
            )}
          </div>
        </div>

        {/* Grid one */}
        <div className="flex justify-between  mt-5 ">
          <div className="space-y-1">
            <h1 className="font-base text-[#ADADAD]">Terkonfirmasi</h1>
            <div className="text-lg sm:text-xl md:text-3xl font-semibold">
              {loading ? (
                <LoadingText />
              ) : (
                <CountUp end={total?.active} separator={","} duration={1} />
              )}
            </div>
          </div>

          <div className="border-r border-[#404040] " />

          <div className="space-y-1">
            <h1 className="font-base text-[#ADADAD]">Sembuh</h1>
            <div className="text-lg sm:text-xl md:text-3xl font-semibold">
              {loading ? (
                <LoadingText />
              ) : (
                <CountUp end={total?.recovered} separator={","} duration={1} />
              )}
            </div>
          </div>

          <div className="border-r border-[#404040] " />

          <div className="space-y-1">
            <h1 className="font-base text-[#ADADAD]">Meninggal</h1>
            <div className="text-lg md:text-3xl font-semibold">
              {loading ? (
                <LoadingText />
              ) : (
                <CountUp end={total?.active} separator={","} duration={1} />
              )}
            </div>
          </div>
        </div>

        {/* last update */}
        <div className="flex justify-end mt-5">
          <h1 className="text-[#ADADAD]">
            Update Terakhir :
            <span className="text-white">
              {moment(total?.updated).fromNow()}
            </span>
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
};
