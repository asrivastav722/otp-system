export default function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const MASTER_KEY = process.env.API_KEY;

  if (!MASTER_KEY || apiKey !== MASTER_KEY) {
    return res.status(401).json({ error: "Invalid or missing API Key" });
  }

  next();
}