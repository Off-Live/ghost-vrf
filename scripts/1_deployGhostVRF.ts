// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import * as dotenv from "dotenv";
import { ethers } from "hardhat";

dotenv.config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()),
    "ETH"
  );

  // We get the contract to deploy
  const GhostVRF = await ethers.getContractFactory("GhostVRF");
  const ghostVRF = await GhostVRF.deploy(
    process.env.VRF_COORDINATOR || "",
    process.env.LINK_CA || "",
    process.env.KEY_HASH || "",
    process.env.LINK_FEE || "",
    10000,
    process.env.IPFS_BASE_URI || ""
  );

  await ghostVRF.deployed();

  console.log("Ghost VRF deployed to:", ghostVRF.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
