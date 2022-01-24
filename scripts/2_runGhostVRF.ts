import * as dotenv from "dotenv";
import { ethers } from "hardhat";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Connected to the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()),
    "ETH"
  );

  const GhostVRF = await ethers.getContractFactory("GhostVRF");
  const ghostVRF = await GhostVRF.attach(process.env.CONTRACT_ADDRESS || "");
  console.log(`Attached to the contract: ${process.env.CONTRACT_ADDRESS}`);

  await ghostVRF.rollDice();
  console.log("Run VRF!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
