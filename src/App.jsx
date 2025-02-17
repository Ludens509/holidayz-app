import Header from "./components/Header";
import HolidayCard from "./components/HolidayCard";
import MainWrapper from "./components/MainWrapper";
import Tabs from "./components/Tabs";
import "./index.css";
import "./App.css";

function App() {
  return (
    <>
      {/* MainWrapper is the main wrapper of the extension */}
      <MainWrapper>
        {/*Header Contain the mainly the header of the extension */}
        <Header />
        {/*HolidayCard Contain the card that display the name and infos about current holiday  */}
        <HolidayCard />
        <Tabs />
      </MainWrapper>
    </>
  );
}

export default App;
