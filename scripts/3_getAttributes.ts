import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

dotenv.config();

async function main() {
  const GhostVRF = await ethers.getContractFactory("GhostVRF");
  const ghostVRF = await GhostVRF.attach(process.env.CONTRACT_ADDRESS || "");
  console.log(`Attached to the contract: ${process.env.CONTRACT_ADDRESS}`);

  const totalSupply = 10000;
  const numTeamNFTs = 21;

  function ranking(arr: BigNumber[]) {
    const sorted: BigNumber[] = [...arr].sort((a: BigNumber, b: BigNumber) => {
      return b.sub(a).toNumber();
    });
    return arr.map((x) => sorted.indexOf(x));
  }

  const randomNumbers: BigNumber[] = [];
  let offset = numTeamNFTs;
  while (offset < totalSupply) {
    const batchSize = Math.min(100, totalSupply - offset);
    randomNumbers.push(
      ...(await ghostVRF.getBatchRandomNumbers(offset, batchSize))
    );
    offset += batchSize;
  }

  const ranks = ranking(randomNumbers);

  if (process.env.TOKEN_ID) {
    const tokenID = parseInt(process.env.TOKEN_ID) || 0;
    const idx = tokenID - numTeamNFTs;
    console.log(
      tokenID,
      randomNumbers[idx].toNumber(),
      ranks[idx] + numTeamNFTs
    );
  } else {
    for (let i = 0; i < numTeamNFTs; i++) {
      console.log(i, "_", i);
    }
    ranks.forEach((rank, idx) => {
      const tokenId = idx + numTeamNFTs;
      console.log(tokenId, randomNumbers[idx].toNumber(), rank + numTeamNFTs);
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
