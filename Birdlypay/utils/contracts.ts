import { createThirdwebClient, getContract, resolveMethod, ThirdwebContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { STAKING_CONTRACT_ABI } from "./stakingContractABI";

const stakeTokenContractAddress = '0x7Bb1F6CF18Ac5DE423c80F089C06906EA4fa9A13';
const rewardTojenContractAddress = '0x93d89E39934Cc3D8a400552eCcbc6b90071B2048';
const stakingContractAddress = '0x6684c31585aa1F6131f7E8288cca6b3d450B7103';

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
  });
  

export const STAKE_TOKEN_CONTRACT = getContract({
    client,
    chain: defineChain(84532),
    address: stakeTokenContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client,
    chain: defineChain(84532),
    address: rewardTojenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client,
    chain: defineChain(84532),
    address: stakingContractAddress,
    abi: STAKING_CONTRACT_ABI
});
