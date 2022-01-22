# Deploy GhostVRF Contract

Copy the .env.example file to a file named .env, and then edit it to fill in the details.

Enter your Etherscan API key, your mainnet node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run --network mainnet scripts/1_deployGhostVRF.ts > log deploy.log 
```


# Run VRF Method

Copy the .env.example file to a file named .env, and then edit it to fill in the details. 
Enter your Etherscan API key, your mainnet node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. 

```shell
npx hardhat run --network mainnet scripts/2_runGhostVRF.ts > log/runVRF.log
```

# Get Attributes

To get the ipfs uri of your attribute of token id [tokenID],

```shell
npx hardhat run --network mainnet scripts/3_getAttributes.ts TOKEN_ID=[tokenID] > log/attribute.log
```

To get ipfs uris of all attribute of ghosts,
```shell
npx hardhat run --network mainnet scripts/3_getAttributes.ts > log/attributes.log
```

