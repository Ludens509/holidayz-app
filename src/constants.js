export const COUNTRY = "US";
export const YEAR = Number(2024);
// export const getCurrentDate = () => {
//     const today = new Date();
//     // const year = today.getFullYear();
//     const month = Number(today.getMonth() + 1).padStart(2, "0");
//     const day = Number(today.getDate()).padStart(2, "0");
//     return `${month}-${day}`;
//   };
export const getCurrentMonth = () => {
  const today = new Date();
  today.setFullYear(YEAR); // Set the year to 2024
  const month = today.getMonth() + 1; // Get the month (0-based index, so add 1)
  return month;
};

export const getCurrentDay = () => {
  const today = new Date();
  today.setFullYear(YEAR); // Set the year to 2024
  const day = today.getDate(); // Get the day
  return day;
};