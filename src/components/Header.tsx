import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <div className="flex-none w-full h-fit bg-transparent p-4 px-6 flex items-center justify-between gap-6">
      {/* logo */}
      <h3 className="w-fit flex-none text-amber-50 font-bold text-3xl">. W</h3>
      {/* search bar */}
      <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-2xl w-full h-full max-w-96 px-4">
        <input
          type="text"
          id="Search"
          placeholder="Search for city"
          className="text-amber-50 w-full outline-none border-transparent"
        />

        <button type="button" className="w-auto flex-none cursor-pointer">
          <MagnifyingGlassIcon className="w-4 text-amber-50" />
        </button>
      </div>

      {/* account */}
      <div className="w-fit flex-none border-gray-100">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="size-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Header;
