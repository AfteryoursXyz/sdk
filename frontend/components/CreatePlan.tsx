"use client";

import { useState } from "react";
import { createPlan } from "../lib/contract";

export default function CreatePlan() {
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("0.1");
  const [days, setDays] = useState(30);

  const handleCreate = async () => {
    const unlockTime =
      Math.floor(Date.now() / 1000) + days * 86400;

    await createPlan(beneficiary, unlockTime, amount);
    alert("Plan created!");
  };

  return (
    <div>
      <h2>Create Afteryours Plan</h2>

      <input
        placeholder="Beneficiary address"
        onChange={(e) => setBeneficiary(e.target.value)}
      />

      <input
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      />

      <button onClick={handleCreate}>
        Create Plan
      </button>
    </div>
  );
}
