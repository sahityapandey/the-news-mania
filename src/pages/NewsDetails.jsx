import { useLocation } from "react-router-dom";

export default function NewsDetails() {
  const { state } = useLocation();
  const article = state;

  if (!article) return <p>No data</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <img
        src={article.urlToImage}
        className="w-full h-80 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">
        {article.title}
      </h1>

      <p className="text-gray-600 mt-2">
        {article.description}
      </p>

      <p className="mt-4">
        {article.content}
      </p>

      <a
        href={article.url}
        target="_blank"
        className="text-indigo-600 mt-4 inline-block"
      >
        Read Full Article →
      </a>

    </div>
  );
}