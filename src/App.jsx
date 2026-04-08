import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Content from "./components/Content";
import NewsDetails from "./pages/NewsDetails";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export default function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [query]);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${API_KEY}`
      );

      const data = await res.json();

      console.log(data); // debug ke liye

      setNews(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white min-h-screen">

      <Navbar setQuery={setQuery} />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              {loading ? (
                <p className="text-center mt-10">Loading news...</p>
              ) : (
                <>
                  <Hero news={news} />
                  <Content news={news} />
                </>
              )}
            </>
          }
        />

        {/* DETAILS PAGE */}
        <Route path="/news" element={<NewsDetails />} />
      </Routes>

    </div>
  );
}