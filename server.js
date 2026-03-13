import express from "express";
import cors from "cors";
import smsRoutes from "./routes/smsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sms", smsRoutes);

app.listen(3000, () => {
  console.log("SMS Platform running on port 3000");
});