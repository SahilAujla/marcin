const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so randomWinnerGame here is a factory for instances of our RandomWinnerGame contract.
 */

  const metadataURL = "ipfs://QmPaCfjnS3dBGKbnHKM5TauxiY2b1bLmUaAeQgx9kLd88a/";

  const marcinNFT = await ethers.getContractFactory("Marcin");
  // deploy the contract
  const deployedMarcinNFT = await marcinNFT.deploy(metadataURL);

  await deployedMarcinNFT.deployed();

  // print the address of the deployed contract
  console.log("Verify Contract Address:", deployedMarcinNFT.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedMarcinNFT.address,
    constructorArguments: [metadataURL],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
