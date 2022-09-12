const { expect } = require("chai");

describe("TestContract", async () => {
  
  it("Should return the right name and symbol", async function () {
    const TestContract = await hre.ethers.getContractFactory("TestContract");
    const testContract = await TestContract.deploy();

    await testContract.deployed();
    expect(await testContract.name()).to.equal("TestContract");
    expect(await testContract.symbol()).to.equal("TC");
  });

  /* it("Should mint new NFT when requested", async function () {
    const TestContract = await hre.ethers.getContractFactory("TestContract");
    const testContract = await TestContract.deploy();

    await testContract.deployed();
    const txResponse = await testContract.createComponent('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266','https://game.example/item-id-8u5h2m.png')
    const txReceipt = await txResponse.wait();
    const [transferEvent] = txReceipt.events;
    const tokenId1 = transferEvent.args['tokenId']
    const txResponse2 = await testContract.createComponent('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266','https://game.example/itemasdf.png')
    const txReceipt2 = await txResponse2.wait();
    const [transferEvent2] = txReceipt2.events;
    const tokenId2 = transferEvent2.args['tokenId']

    const Uri1 = await testContract.tokenURI(tokenId1)
    console.log(Uri1)

    const Uri2 = await testContract.tokenURI(tokenId2)
    console.log(Uri2)





  }); */
});
