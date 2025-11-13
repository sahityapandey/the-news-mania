import React from "react";

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, source, publishedAt } = article;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 overflow-hidden">
      <img
        src={urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-56">
        <div>
          <h2 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>
        <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
          <span>{source?.name}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
