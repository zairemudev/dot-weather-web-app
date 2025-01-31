import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

type Props = {
  updateDarkMode: (value: boolean) => void;
  updateCity: (value: string) => void;
};

function Header({ updateDarkMode, updateCity }: Props) {
  const [darkMode, setDarkMode] = useState<Boolean>(false);
  const [search, setSearch] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  const searchWeatherByCity = () => {
    if (inputRef) {
      // console.log("input value:", search || "");

      updateCity(search || "");
      setSearch("");
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex-none w-full h-fit bg-transparent p-4 px-6 flex items-center justify-between gap-6">
      {/* logo */}
      <h3 className="w-fit flex-none dark:text-amber-50 font-black text-3xl font-pacifico">
        . W
      </h3>
      {/* search bar */}
      <div className="flex items-center justify-between gap-4 border dark:border-gray-200 rounded-2xl w-full h-full max-w-96 px-4">
        <input
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          id="Search"
          placeholder="Search for city"
          className="text-gray-700 dark:text-amber-50 w-full outline-none border-transparent"
        />

        <button
          type="button"
          className="w-auto flex-none cursor-pointer"
          onClick={searchWeatherByCity}
        >
          <MagnifyingGlassIcon className="w-4 dark:text-amber-50" />
        </button>
      </div>

      {/* setting light or dark mode */}
      <div className="w-fit flex-none ">
        <button className="cursor-pointer" onClick={toggleDarkMode}>
          <span className="inline-flex justify-center items-center rounded-full border size-10 p-1 inset-shadow-sm border-black bg-gray-50 hover:bg-gray-700 dark:border-gray-50 dark:bg-gray-700/25 dark:hover:bg-gray-100">
            <span aria-hidden="true" role="img" className="text-lg">
              {darkMode ? "🌞" : "🌜"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
