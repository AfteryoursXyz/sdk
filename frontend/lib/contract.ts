import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT!;

const abi = [
  "function createPlan(address,uint256) payable"
];

export async function createPlan(
  beneficiary: string,
  unlockTime: number,
  amount: string
) {
  if (!(window as any).ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(
    (window as any).ethereum
  );

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  const tx = await contract.createPlan(
    beneficiary,
    unlockTime,
    {
      value: ethers.parseEther(amount)
    }
  );

  await tx.wait();
}
