import { useState } from "react";
import { debounce } from "../utils/debounce";

export default function Navbar({ setQuery }) {
  const [dark, setDark] = useState(false);

  const handleSearch = debounce((value) => {
    setQuery(value);
  }, 500);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="border-b bg-white dark:bg-gray-900 dark:text-white">

      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        <h1 className="text-3xl font-bold">News Mania</h1>

        <div className="flex gap-3">
          <input
            placeholder="Search..."
            className="border px-3 py-1 rounded-md"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={toggleDark}>🌙</button>
        </div>
      </div>

      <div className="flex gap-6 px-6 py-2 text-sm border-t overflow-x-auto">
        {["Latest","Technology","Sports","Business","Health"].map((cat)=>(
          <span
            key={cat}
            onClick={() => setQuery(cat)}
            className="cursor-pointer hover:text-indigo-600"
          >
            {cat}
          </span>
        ))}
      </div>

    </div>
  );
}