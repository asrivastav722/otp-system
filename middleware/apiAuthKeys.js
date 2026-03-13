const API_KEYS = [
  "sk_test_123",
  "sk_test_456"
];

export default function apiKeyAuth(req, res, next) {

  const key = req.headers.authorization;

  if (!key || !API_KEYS.includes(key)) {
    return res.status(401).json({
      error: "Invalid API key"
    });
  }

  next();
}