const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("http");

const { createServer } = require("./server");

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();

      http
        .get(
          {
            hostname: "127.0.0.1",
            port,
            path
          },
          (res) => {
            let body = "";

            res.on("data", (chunk) => {
              body += chunk;
            });

            res.on("end", () => {
              server.close();

              resolve({
                statusCode: res.statusCode,
                body: JSON.parse(body)
              });
            });
          }
        )
        .on("error", (error) => {
          server.close();
          reject(error);
        });
    });
  });
}

test("GET / returns application information", async () => {
  const response = await makeRequest("/");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.message, "Cloud CI/CD Demo");
});

test("GET /health returns healthy status", async () => {
  const response = await makeRequest("/health");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, "healthy");
  assert.equal(response.body.service, "cloud-cicd-demo");
});

test("unknown endpoint returns 404", async () => {
  const response = await makeRequest("/unknown");

  assert.equal(response.statusCode, 404);
  assert.equal(response.body.error, "Not Found");
});
