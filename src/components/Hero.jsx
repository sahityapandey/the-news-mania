export default function Hero({ news }) {
  if (!news.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-3 gap-4">

      <div className="md:col-span-2 h-[350px] relative rounded-lg overflow-hidden">
        <img src={news[0]?.urlToImage || "https://via.placeholder.com/800"} />

        <div className="absolute inset-0 bg-black/60 flex items-end p-4">
          <h2 className="text-white text-xl font-bold">
            {news[0]?.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {news.slice(1,5).map((item, i) => (
          <div key={i} className="h-[170px] relative rounded-lg overflow-hidden">
            <img src={item.urlToImage || "https://via.placeholder.com/300"} />

            <div className="absolute inset-0 bg-black/40 flex items-end p-2">
              <p className="text-white text-sm">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}