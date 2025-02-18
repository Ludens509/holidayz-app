export const fetchHolidays = async (apiKey, country, year, month, day) => {
  // const baseUrl = "http://localhost:5000/api/holidays"; // Proxy server URL
  const baseUrl = "https://holidayz-api-app.onrender.com/api/holidays"; // Proxy server URL on RENDER

  // Construct the base URL with required parameters
  let url = `${baseUrl}?key=${apiKey}&country=${country}&year=${year}`;

  // Add month and day parameters only if they are provided
  if (month !== undefined && month !== null) {
    url += `&month=${month}`;
  }
  if (day !== undefined && day !== null) {
    url += `&day=${day}`;
  }

  try {
    const response = await fetch(url);

    // Log the raw response for debugging
    const rawResponse = await response.text();
    console.log("Raw API Response:", rawResponse);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${rawResponse}`);
    }

    // Parse the response as JSON
    const data = JSON.parse(rawResponse);
    console.log("Parsed API Data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};