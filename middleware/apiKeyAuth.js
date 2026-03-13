export default function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const MASTER_KEY = process.env.API_KEY;

  // DEBUG LOGS (Check these in Railway's "Logs" tab)
  console.log("--- Auth Check ---");
  console.log("Header Key:", apiKey);
  console.log("Expected Key (First 4 chars):", MASTER_KEY ? MASTER_KEY.substring(0, 4) : "UNDEFINED");

  if (!MASTER_KEY || apiKey !== MASTER_KEY) {
    return res.status(401).json({ 
      error: "Unauthorized",
      hint: !MASTER_KEY ? "Server has no API_KEY set" : "Key mismatch"
    });
  }

  next();
}