import { Worker } from "bullmq";
import axios from "axios";
import connection from "./config/redis.js";
import gateways from "./data/gateways.js";

function getGateway() {
  return gateways[Math.floor(Math.random() * gateways.length)];
}

new Worker(
  "smsQueue",
  async job => {

    const { to, message, messageId } = job.data;

    const gateway = getGateway();

    try {

      await axios.get(`${gateway.url}/send`, {
        params: {
          phone: to,
          message
        }
      });

      console.log(`SMS sent ${messageId} via ${gateway.name}`);

    } catch (err) {

      console.log("SMS failed", err.message);

      throw err;
    }

  },
  { connection }
);