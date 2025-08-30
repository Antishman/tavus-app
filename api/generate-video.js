export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { script } = req.body;

  try {
    const response = await fetch("https://api.tavus.io/v1/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAVUS_API_KEY}`,
      },
      body: JSON.stringify({
        script,
        replica_id: "stock_avatar_id_here",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate video" });
  }
}