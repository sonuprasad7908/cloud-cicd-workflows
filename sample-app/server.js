const http = require("http");

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "development";

function requestHandler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Cloud CI/CD Demo",
        version: APP_VERSION
      })
    );
    return;
  }

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: "healthy",
        service: "cloud-cicd-demo"
      })
    );
    return;
  }

  res.writeHead(404);
  res.end(
    JSON.stringify({
      error: "Not Found"
    })
  );
}

function createServer() {
  return http.createServer(requestHandler);
}

if (require.main === module) {
  const server = createServer();

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Cloud CI/CD Demo running on port ${PORT}`);
  });
}

module.exports = { createServer };
