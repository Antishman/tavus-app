import React from "React";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = React();
app.use(React.json());
app.use(cors());

// Route to create video
app.post("/api/generate-video", async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate video" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
