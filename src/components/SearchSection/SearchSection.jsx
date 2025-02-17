import React from "react";
// import PropTypes from "prop-types";
import useSWR from "swr";
// import axios from "axios";
import listCountry, { listMonth } from "../../utils";
import SearchResultWrapper from "../SearchResultWrapper";
import WarmingToast from "../WarningToast";
import { YEAR } from "../../constants";
import { fetchHolidays } from "../../api";

function SearchSection() {
  const countries = listCountry();
  const months = listMonth();
  const [selectedCoutryCode, setselectedCoutryCode] = React.useState("");
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(true);
  const [shouldFetch, setShouldFetch] = React.useState(false);

  const id = React.useId();

  const apiKey = import.meta.env.VITE_HOLIDAY_API_KEY;
  // const base_Url = "https://holidayapi.com/v1/holidays";

  // const api_Key = import.meta.env.VITE_HOLIDAY_API_KEY;
  // const base_Url = import.meta.env.VITE_HOLIDAY_API_URL;

  // const getCurrentDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const day = String(today.getDate()).padStart(2, "0");
  //   return `${year}`;
  // };

  const { data, isLoading, error } = useSWR(
    shouldFetch ? [apiKey, selectedCoutryCode, YEAR, selectedMonth] : null,
    ([apikey, country, year, month]) =>
      fetchHolidays(apikey, country, year, month)
  );

  React.useEffect(() => {
    if (shouldFetch) {
      const intervalId = window.setInterval(() => {
        setIsOpen(false);
      }, 6 * 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [shouldFetch]);

  const handleSubmit = (event) => {
    console.log("Selected Country code:", selectedCoutryCode);
    console.log("Selected Month:", selectedMonth);
    // Add your submit logic here
    event.preventDefault();
    if (selectedCoutryCode && selectedMonth) {
      setShouldFetch(!shouldFetch);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setselectedCoutryCode("");
    setSelectedMonth("");
    setShouldFetch(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 mb-2">
        <div>
          {isOpen && shouldFetch ? (
            <WarmingToast data={data?.requests} />
          ) : null}
        </div>
        <form className="flex " onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="relative w-full">
              <select
                required={true}
                value={selectedCoutryCode}
                onChange={(e) => setselectedCoutryCode(e.target.value)}
                className="w-full p-2 border-1 border-gray-400 rounded-md appearance-none  bg-white text-gray-700 overflow-auto custom-scrollbar"
              >
                <option value="">Select an option...</option>
                {countries.map((country) => (
                  <option key={`${id}-${country.name}`} value={country.code}>
                    {country.name} - {country.code}
                  </option>
                ))}
              </select>
              {selectedCoutryCode && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
            {/* Month picker with calendar icon */}
            <div className="relative text-gray-900">
              <select
                required={true}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-2 pl-8 border-1 border-gray-400 rounded-md appearance-none bg-white text-gray-700 overflow-y-auto"
              >
                <option value="">Month...</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <button
              type="submit"
              disabled={(!selectedCoutryCode && !selectedMonth) || isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      <div>
        {error && (
          <div className="text-red-500 mt-2">Error: {error.message}</div>
        )}
      </div>

      {data && (
        <section className="border border-gray-300 dark:border-gray-200 rounded-2xl shadow-md  overflow-y-scroll h-[200px]">
          <SearchResultWrapper isLoading={isLoading} data={data?.holidays} />
        </section>
      )}
    </>
  );
}

export default SearchSection;
