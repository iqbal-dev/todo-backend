describe("Wait hook before running test", () => {
  before(async () => {
    const waitingTime = 1000;
    await new Promise((resolve) => setTimeout(resolve, waitingTime));
    // eslint-disable-next-line no-console
    console.log(`Waited ${waitingTime}ms before running tests`);
  });

  it("should delay before running tests", async () => {});
});
