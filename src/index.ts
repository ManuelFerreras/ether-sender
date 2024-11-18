import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function sendEther(
  receiverAddress: string,
  amountInEther: string
): Promise<void> {
  try {
    // Check if private key exists in environment variables
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key not found in environment variables");
    }

    // Connect to Ethereum network (using default provider)
    const provider = ethers.getDefaultProvider("base");

    // Create wallet instance
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create transaction object
    const tx = {
      to: receiverAddress,
      value: ethers.parseEther(amountInEther),
    };

    // Send transaction
    console.log("Sending transaction...");
    const transaction = await wallet.sendTransaction(tx);

    console.log("Transaction sent! Waiting for confirmation...");
    await transaction.wait();

    console.log(`Transaction confirmed! Hash: ${transaction.hash}`);
  } catch (error) {
    console.error("Error sending ether:", error);
    throw error;
  }
}

async function getBalance(): Promise<void> {
  const pk = process.env.WALLET_PRIVATE_KEY;
  const provider = ethers.getDefaultProvider("base");
  const wallet = new ethers.Wallet(pk, provider);
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)}`);
}

// Example usage
getBalance();
sendEther("0xaddress", "0.00001");
