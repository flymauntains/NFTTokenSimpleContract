const MyNFT = artifacts.require("MyNFT");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(MyNFT);
  const myNFT = await MyNFT.deployed();

  console.log("MyNFT deployed at address:", MyNFT.address);
};