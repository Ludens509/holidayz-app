import React from "react";
import PropTypes from "prop-types";

function WarningToast({
  data = {
    available: 0,
    resets: "next month",
  },
}) {
  const [isOn, setIsOn] = React.useState(true);

  const handleToastBtn = () => {
    setIsOn(!isOn);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {isOn && (
        <div className="flex items-center justify-between gap-4 bg-indigo-600 px-3 py-2 text-white">
          <p className="text-sm font-medium max-w-[300px]">
            {`You have ${data?.available} requests left for month. It will reset on ${data?.resets}`}
          </p>

          <button
            onClick={handleToastBtn}
            aria-label="Dismiss"
            className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
WarningToast.propTypes = {
  data: PropTypes.shape({
    available: PropTypes.number,
    resets: PropTypes.string,
  }),
};

export default WarningToast;
