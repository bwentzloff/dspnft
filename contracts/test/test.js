const { expect } = require("chai");

describe("TestContract", function () {
  it("Should return the right name and symbol", async function () {
    const TestContract = await hre.ethers.getContractFactory("TestContract");
    const testContract = await TestContract.deploy("TestContract", "TC");

    await testContract.deployed();
    expect(await testContract.name()).to.equal("TestContract");
    expect(await testContract.symbol()).to.equal("TC");
  });
});
