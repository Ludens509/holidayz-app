import { useState, useEffect } from "react";
import useSWR from "swr";
import { COUNTRY, YEAR, getCurrentMonth, getCurrentDay } from "../../constants";
import { fetchHolidays } from "../../api";

const Timeline = () => {
  const apiKey = import.meta.env.VITE_HOLIDAY_API_KEY;

  const MONTH = String(getCurrentMonth());
  const DAY = getCurrentDay();
  const [isCurrentDayHoliday, setIsCurrentDayHoliday] = useState(false);

  const { data, isLoading } = useSWR(
    ["timeline", apiKey, COUNTRY, YEAR, MONTH],
    ([, apiKey, country, year, month]) =>
      fetchHolidays(apiKey, country, year, month)
  );

  useEffect(() => {
    if (data && data.holidays) {
      HandleCurrentDate(data.holidays);
    }
  }, [data]);

  const HandleCurrentDate = (holidays) => {
    for (let i = 0; i < holidays.length; i++) {
      const holidayDate = new Date(holidays[i].date);
      const holidayDay = holidayDate.getDate();
      if (holidayDay === DAY) {
        setIsCurrentDayHoliday(true);
        return;
      }
    }
    setIsCurrentDayHoliday(false);
  };

  return (
    <>
      <section
        className="border border-gray-200 dark:border-gray-200 rounded-2xl h-[300px] overflow-auto
        custom-scrollbar"
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="relative m-2 ">
            <ol className="relative m-5 border-s border-gray-200 dark:border-gray-700">
              {data?.holidays?.map((holiday) => (
                <li key={holiday.uuid} className="mb-8 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-500 ${
                      isCurrentDayHoliday
                        ? "dark:bg-green-500"
                        : "dark:bg-blue-500"
                    } `}
                  >
                    <svg
                      className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 ">
                    {holiday.name}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {`Observed - ${holiday.observed}`}
                  </time>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
};

export default Timeline;
