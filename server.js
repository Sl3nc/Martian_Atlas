/**
 * Martian Atlas - Local HTTP & Telemetry Server (Node.js)
 * Follows engineering-template structured logging conventions (en-US logs, correlation_id).
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".geojson": "application/geo+json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

function logEvent(level, message, correlationId, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    correlation_id: correlationId || crypto.randomUUID(),
    service: "martian-atlas-server",
    message,
    ...meta,
  };
  console.log(JSON.stringify(entry));
}

const server = http.createServer((req, res) => {
  const correlationId = req.headers["x-correlation-id"] || crypto.randomUUID();
  res.setHeader("X-Correlation-Id", correlationId);

  const safeUrl = req.url.split("?")[0];
  logEvent("DEBUG", "incoming_http_request", correlationId, {
    method: req.method,
    path: safeUrl,
  });

  let filePath = path.join(PUBLIC_DIR, safeUrl === "/" ? "index.html" : safeUrl);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, content) => {
    if (err) {
      logEvent("WARN", "static_asset_not_found", correlationId, { file: filePath });
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found", correlation_id: correlationId }));
      return;
    }
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  logEvent("INFO", `Martian Atlas server listening on http://localhost:${PORT}`, "startup-init", {
    port: PORT,
    public_dir: PUBLIC_DIR,
  });
});
