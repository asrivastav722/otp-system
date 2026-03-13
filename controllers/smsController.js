import smsQueue from "../queue/smsQueue.js";
import { v4 as uuidv4 } from "uuid";

export const sendSMS = async (req, res) => {

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({
      error: "Missing fields"
    });
  }

  const messageId = uuidv4();

  await smsQueue.add("send_sms", {
    messageId,
    to,
    message
  });

  res.json({
    success: true,
    messageId,
    status: "queued"
  });
};