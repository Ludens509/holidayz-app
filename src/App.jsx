// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import useSWR from "swr";
import { COUNTRY, YEAR, getCurrentMonth, getCurrentDay } from "./constants";
import { fetchHolidays } from "./api";
import Header from "./components/Header";
import HolidayCard from "./components/HolidayCard";
import MainWrapper from "./components/MainWrapper";
import Tabs from "./components/Tabs";
import "./index.css";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_HOLIDAY_API_KEY;
  const MONTH = getCurrentMonth();
  const DAY = getCurrentDay();

  const { data, isLoading } = useSWR(
    ["app", apiKey, COUNTRY, YEAR, MONTH, DAY],
    ([, apiKey, country, year, month, day]) =>
      fetchHolidays(apiKey, country, year, month, day)
  );
  return (
    <>
      {/* MainWrapper is the main wrapper of the extension */}
      <MainWrapper>
        {/*Header Contain the mainly the header of the extension */}
        <Header />
        {/*HolidayCard Contain the card that display the name and infos about current holiday  */}
        <HolidayCard data={data} isLoading={isLoading} />
        <Tabs />
      </MainWrapper>
    </>
  );
}

export default App;
