import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status with wrong method", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowed",
        message: "Method not allowed",
        action: "Check if the requested method is correct",
        status_code: 405,
      });
    });
  });
});
