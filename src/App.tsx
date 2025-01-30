import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="bg-black w-screen h-screen p-6 flex">
      <div className="flex flex-col w-full h-full 2xl:max-w-[1440px] rounded-xl bg-gray-700/25 border border-black shadow-lg m-auto">
        {/* header */}
        <Header />

        {/* body */}
        <div className="flex-auto w-full h-full text-amber-50 px-6 p-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* weather */}
          <Weather city="London" />
          {/* PM score */}
          <div className="h-full rounded-lg bg-gray-700/25 border border-black shadow-lg"></div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
