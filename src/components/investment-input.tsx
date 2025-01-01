import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface InvestmentInputProps {
  onInvestmentChange: (amount: number) => void;
}

export function InvestmentInput({ onInvestmentChange }: InvestmentInputProps) {
  const [investment, setInvestment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investment);
    if (!isNaN(amount) && amount > 0) {
      onInvestmentChange(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <Label htmlFor="investment">Investment Amount ($)</Label>
        <Input
          id="investment"
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          placeholder="Enter your investment amount"
          min="0"
          step="0.01"
        />
      </div>
      <Button type="submit">Calculate Investment</Button>
    </form>
  );
}
