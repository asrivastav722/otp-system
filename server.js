import express from "express";
import { addJob, queueSize } from "./queue/smsQueue.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";

const app = express();

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMS API Running");
});

app.post("/api/sms/send", apiKeyAuth, async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await addJob({
      to,
      message,
      createdAt: Date.now()
    });

    res.json({
      success: true,
      status: "queued",
      queueSize: queueSize()
    });

  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`SMS API running on port ${PORT}`);
});