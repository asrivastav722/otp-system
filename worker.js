import axios from "axios";
import { getJob, addJob } from "./queue/smsQueue.js";
import gateways from "./data/gateways.js";

let processing = false;
const MAX_RETRIES = 3;

function getGateway() {
  return gateways[Math.floor(Math.random() * gateways.length)];
}

async function processQueue() {
  if (processing) return;
  
  const job = getJob();
  if (!job) return;

  processing = true;
  const gateway = getGateway();

  try {
    console.log(`Attempting SMS to ${job.to} via ${gateway.name}`);
    
    await axios.get(`${gateway.url}/send`, {
      params: { phone: job.to, message: job.message },
      timeout: 10000 // 10 second timeout
    });

    console.log(`✅ Successfully sent to ${job.to}`);
  } catch (err) {
    console.error(`❌ Failed: ${err.message}`);
    
    if (job.retries < MAX_RETRIES) {
      job.retries++;
      console.log(`Retrying (${job.retries}/${MAX_RETRIES})...`);
      addJob(job); // Put it back in the queue
    } else {
      console.error(`Giving up on ${job.to} after ${MAX_RETRIES} fails.`);
    }
  } finally {
    processing = false;
  }
}

// Check the queue every 2 seconds
setInterval(processQueue, 2000);