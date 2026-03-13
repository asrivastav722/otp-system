import express from "express";
import { Queue } from "bullmq";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const connection = new Redis();
const smsQueue = new Queue("sms", { connection });

app.post("/sms/send", async (req, res) => {
  const { to, message } = req.body;

  await smsQueue.add("send_sms", { to, message });

  res.json({
    success: true,
    status: "queued"
  });
});

app.listen(3000);