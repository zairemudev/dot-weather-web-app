import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Weather from "./components/Weather";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [city, setCity] = useState<string>("Bangkok");

  const updateDarkMode = (value: boolean) => {
    setDarkMode(value);
  };

  const updateCity = (value: string) => {
    setCity(value);
  };

  // console.log("dark mode:", darkMode);

  // const initcurrentCity = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("position:", position);

  //         // what to do once we have the position
  //         const { latitude, longitude } = position.coords;
  //         // update the value of userlocation variable

  //         setCity({ name: "", latitude, longitude });
  //       },
  //       (error) => {
  //         // display an error if we cant get the users position
  //         console.error("Error getting user location:", error);
  //       }
  //     );
  //   }
  // };

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="bg-gray-50 dark:bg-black w-screen h-screen p-6 flex">
        <div className="flex flex-col w-full h-full min-w-sm 2xl:max-w-[1440px] rounded-xl dark:bg-gray-700/25 border bg-white border-gray-50 dark:border-black shadow-lg m-auto">
          {/* header */}
          <Header updateDarkMode={updateDarkMode} updateCity={updateCity} />

          {/* weather */}
          <Weather city={city} />

          {/* footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
