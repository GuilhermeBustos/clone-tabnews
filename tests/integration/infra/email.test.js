import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmail();

    await email.send({
      from: "Guilherme <guilherme.bustos@outlook.com>",
      to: "guilherme.bustos@outlook.com",
      subject: "Subject test",
      text: "Test email body.",
    });

    await email.send({
      from: "Guilherme <guilherme.bustos@outlook.com>",
      to: "guilherme.bustos@outlook.com",
      subject: "Last email sent",
      text: "Body from the last email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<guilherme.bustos@outlook.com>");
    expect(lastEmail.recipients[0]).toBe("<guilherme.bustos@outlook.com>");
    expect(lastEmail.subject).toBe("Last email sent");
    expect(lastEmail.text).toBe("Body from the last email.\n");
  });
});
