import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Content({ news }) {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  const toggleBookmark = (article) => {
    let updated;

    if (bookmarks.find((item) => item.url === article.url)) {
      updated = bookmarks.filter((item) => item.url !== article.url);
    } else {
      updated = [...bookmarks, article];
    }

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  if (news.length === 0) {
    return <p className="text-center mt-10">No news found 😕</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-8 px-4">

      <div className="md:col-span-2 space-y-6">

        {news.slice(5).map((item, i) => (
          <div key={i} className="flex gap-4 border-b pb-4">

            <img
              src={item.urlToImage || "https://via.placeholder.com/150"}
              className="w-40 h-28 object-cover rounded"
            />

            <div className="flex-1">
              <h3
                onClick={() => navigate("/news", { state: item })}
                className="font-semibold text-lg cursor-pointer"
              >
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>

            <button onClick={() => toggleBookmark(item)}>
              {bookmarks.find((b) => b.url === item.url) ? "❤️" : "🤍"}
            </button>

          </div>
        ))}

      </div>

      <div></div>
    </div>
  );
}