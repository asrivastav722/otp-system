import express from "express";
import { addJob, queueSize } from "./queue/smsQueue.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log("SMS API running on port 3000");
});