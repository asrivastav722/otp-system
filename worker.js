import axios from "axios";
import { getJob } from "./queue/smsQueue.js";
import gateways from "./data/gateways.js";

let processing = false;

function getGateway() {
  return gateways[Math.floor(Math.random() * gateways.length)];
}

async function processQueue() {

  if (processing) return;

  processing = true;

  try {

    const job = getJob();

    if (!job) {
      processing = false;
      return;
    }

    const gateway = getGateway();

    console.log("Sending SMS to:", job.to);

    await axios.get(`${gateway.url}/send`, {
      params: {
        phone: job.to,
        message: job.message
      }
    });

    console.log("SMS sent via", gateway.name);

  } catch (err) {

    console.error("SMS failed:", err.message);

  } finally {

    processing = false;

  }

}

setInterval(processQueue, 2000);

console.log("SMS Worker started");