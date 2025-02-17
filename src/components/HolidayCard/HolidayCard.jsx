import useSWR from "swr";
import { COUNTRY, YEAR, getCurrentMonth, getCurrentDay } from "../../constants";
import { fetchHolidays } from "../../api";
import PropTypes from "prop-types";
import listCountry from "../../utils";
import Loader from "../Loader";

const HolidayCard = () => {
  const apiKey = import.meta.env.VITE_HOLIDAY_API_KEY;
  const MONTH = getCurrentMonth();
  const DAY = getCurrentDay();

  const { data, isLoading } = useSWR(
    [apiKey, COUNTRY, YEAR, MONTH, DAY],
    ([apiKey, country, year, month, day]) =>
      fetchHolidays(apiKey, country, year, month, day)
  );

  const countries = listCountry();
  function getCountryLabel(countryCode) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].code === String(countryCode)) {
        let text = countries[i].name;
        return text;
      }
    }
    return countryCode;
  }

  if (isLoading) {
    return (
      <div className=" flex justify-center py-3">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="p-2 h-[210px] overflow-auto">
        {!data?.holidays || data?.holidays.length === 0 ? (
          <p className="text-center dark:text-purple-900">
            There no Holidays celebrate today in the US
          </p>
        ) : (
          data?.holidays?.map((holiday) => (
            <div
              key={holiday.uuid}
              className="relative block overflow-hidden rounded-lg border border-gray-200 shadow-sm sm:p-6 lg:p-8 mb-6"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="holidaycard-responsive-margin">
                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div>
                    {/* the name of the incooming Holidays */}
                    <h3 className="text-xl font-bold text-gray-900 ">
                      🎉 {holiday.name}
                    </h3>
                    {/* Date of obervence */}
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {`observed on ${holiday.observed}`}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      {`${holiday.country} - ${getCountryLabel(
                        holiday.country
                      )} `}
                    </dt>
                    <dd className="text-sm text-gray-500"> Country</dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      {holiday.weekday.date.name}
                    </dt>
                    <dd className="text-sm text-gray-500">Day</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};
HolidayCard.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default HolidayCard;
