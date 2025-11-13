import React, { useEffect, useState } from "react";

const API_KEY = "0b65fc4fee464b818ef49397aa84b27b"; // Replace with your NewsAPI key
const categories = ["India", "Technology", "Sports", "Science", "Health", "Business", "Entertainment"];

export default function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("India");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(query);
  }, [query]);

  const fetchNews = async (topic) => {
    setLoading(true);
    const res = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`);
    const data = await res.json();
    setNews(data.articles || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <header className="bg-indigo-700 text-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🗞️ <span>News Mania</span>
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search news..."
            className="px-3 py-1.5 rounded-md text-black outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => fetchNews(query)}
            className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100"
          >
            Search
          </button>
        </div>
      </header>

      {/* Category Buttons */}
      <nav className="flex flex-wrap justify-center gap-3 py-4 bg-white shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setQuery(cat)}
            className={`px-4 py-2 rounded-full border ${
              query === cat
                ? "bg-indigo-700 text-white border-indigo-700"
                : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* News Section */}
      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="text-center text-gray-600 text-lg mt-10">Loading news...</div>
        ) : news.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No news found. Try another keyword.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-52 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {article.description || "No description available."}
                  </p>
                  <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
                    <span>{article.source?.name}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} <span className="font-semibold">News Mania</span> | Powered by{" "}
        <a href="https://newsapi.org" target="_blank" rel="noreferrer" className="text-indigo-600">
          NewsAPI.org
        </a>
      </footer>
    </div>
  );
}
