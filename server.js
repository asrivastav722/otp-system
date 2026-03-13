import "dotenv/config";
import express from "express";
import { addJob, queueSize } from "./queue/smsQueue.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";
import "./worker.js"; // This starts the background worker process

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMS Gateway is Active");
});

app.post("/api/sms/send", apiKeyAuth, (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing 'to' or 'message' fields" });
  }

  addJob({
    to,
    message,
    retries: 0,
    createdAt: Date.now()
  });

  res.json({
    success: true,
    status: "queued",
    remaining: queueSize()
  });
});

app.listen(PORT, () => {
  console.log(`Server blasting off on port ${PORT}`);
});