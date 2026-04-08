export default async function handler(req, res) {
  const { q } = req.query;

  const API_KEY = "cf1a5f5ab852fec02f6f447e9071e281";

  const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=10&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}