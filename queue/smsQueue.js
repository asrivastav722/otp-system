import { Queue } from "bullmq";
import connection from "../config/redis.js";

const smsQueue = new Queue("smsQueue", { connection });

export default smsQueue;