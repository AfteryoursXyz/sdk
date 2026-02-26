import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contractAddress = process.env.CONTRACT_ADDRESS!;

const abi = [
  "function planCount() view returns (uint256)",
  "function plans(uint256) view returns (address,address,uint256,uint256,bool)",
  "function executePlan(uint256 planId)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

export async function watchPlans() {
  const count = await contract.planCount();

  for (let i = 1; i <= count; i++) {
    const plan = await contract.plans(i);

    const unlockTime = Number(plan[3]);
    const executed = plan[4];

    if (!executed && Date.now() / 1000 >= unlockTime) {
      console.log(`Executing plan ${i}...`);
      await contract.executePlan(i);
    }
  }
}
