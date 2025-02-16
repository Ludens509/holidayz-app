export const fetchHolidays = async (apiKey, country, year, month, day) => {
  const baseUrl = "http://localhost:5000/api/holidays"; // Proxy server URL
  let url = `${baseUrl}?key=${apiKey}&country=${country}&year=${year}`;

  if (month) url += `&month=${month}`;
  if (day) url += `&day=${day}`;

  try {
    const response = await fetch(url);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      // Attempt to parse the error response as JSON
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        // If parsing fails, use the response text
        errorData = await response.text();
      }
      throw new Error(errorData.message || errorData || "Failed to fetch data");
    }

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};