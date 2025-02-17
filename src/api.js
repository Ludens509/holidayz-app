export const fetchHolidays = async (apiKey, country, year, month, day) => {
  // const baseUrl = "http://localhost:5000/api/holidays"; // Proxy server URL
  const baseUrl = "https://holidayz-api-app.onrender.com/api/holidays"; // Proxy server URL on RENDER
  let url = `${baseUrl}?key=${apiKey}&country=${country}&year=${year}`;

  if (month) url += `&month=${month}`;
  if (day) url += `&day=${day}`;


  const response = await fetch(url);

  // Check if the response is OK (status code 200-299)
  if (!response.ok) {
    // Read the response body only once
    throw response;
  }
  const data = await response.json()
  console.log(data);
  return data;



};