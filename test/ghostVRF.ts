import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("GhostVRF", function () {
  let GhostVRF: ContractFactory;
  let contract: any;
  let owner: SignerWithAddress;
  let guest: SignerWithAddress;

  before(async () => {
    GhostVRF = await ethers.getContractFactory("GhostVRF");

    // contract = await GhostVRF.deploy();
    // await contract.deployed();
    contract = await GhostVRF.attach(process.env.CONTRACT_ADDRESS || "");

    [owner, guest] = await ethers.getSigners();
  });

  it("fail to get random number before rolling the dice", async () => {
    await expect(contract.getRandomNumber(0)).to.be.revertedWith(
      "Dice not rolled"
    );
    await expect(contract.getRandomNumber(111)).to.be.revertedWith(
      "Dice not rolled"
    );
  });

  it("fail to get batch random numbers before rolling the dice", async () => {
    await expect(contract.getBatchRandomNumbers(20, 10)).to.be.revertedWith(
      "Dice not rolled"
    );
  });
});
