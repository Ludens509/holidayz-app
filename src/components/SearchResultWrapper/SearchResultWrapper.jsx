import { useState } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader";

function SearchResultWrapper({ isLoading, data }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No holidays found</p>;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 m-2 text-gray-700 ">
          {data.map((holiday, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3  hover:bg-gray-50 transition-colors"
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => toggleCheckbox(index)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors ${
                      checkedItems[index]
                        ? "border-purple-600 bg-purple-600"
                        : "border-gray-300"
                    }`}
                  >
                    {checkedItems[index] && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium text-gray-900 truncate ${
                      checkedItems[index] ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {holiday.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {holiday.date}
                  </p>
                </div>
              </label>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {holiday.month}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* <dir>{error ? <p>Error</p> : null}</dir> */}
    </>
  );
}

SearchResultWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default SearchResultWrapper;
SearchResultWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
};
