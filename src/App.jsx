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

  useEffect(() => {
    fetchNews();
  }, [query]);

  const fetchNews = async () => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    const data = await res.json();
    setNews(data.articles || []);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white min-h-screen">

      <Navbar setQuery={setQuery} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero news={news} />
              <Content news={news} />
            </>
          }
        />

        <Route path="/news" element={<NewsDetails />} />
      </Routes>

    </div>
  );
}