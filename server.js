import express from "express";
import { addJob, queueSize } from "./queue/smsQueue.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMS Platform Running");
});

app.post("/api/sms/send", apiKeyAuth, (req, res) => {

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  addJob({
    to,
    message,
    createdAt: Date.now()
  });

  res.json({
    success: true,
    status: "queued",
    queueSize: queueSize()
  });

});

app.listen(PORT, () => {
  console.log("SMS API running on port", PORT);
});