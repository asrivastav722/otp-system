import axios from "axios";
import { getJob } from "./queue/smsQueue.js";
import gateways from "./data/gateways.js";

function getGateway() {
  return gateways[Math.floor(Math.random() * gateways.length)];
}

async function processQueue() {

  const job = getJob();

  if (!job) {
    return;
  }

  const gateway = getGateway();

  try {

    await axios.get(`${gateway.url}/send`, {
      params: {
        phone: job.to,
        message: job.message
      }
    });

    console.log("SMS sent to", job.to);

  } catch (err) {

    console.log("SMS failed:", err.message);

  }

}

setInterval(processQueue, 2000);

console.log("Worker started");