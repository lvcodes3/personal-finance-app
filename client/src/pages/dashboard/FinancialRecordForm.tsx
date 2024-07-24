import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { useFinancialRecord } from "../../contexts/financialRecordContext";

export const FinancialRecordForm = () => {
  const { user } = useUser();

  const { createRecord } = useFinancialRecord();

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [payment, setPayment] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      description,
      amount: parseFloat(amount),
      category,
      payment,
      date: new Date(),
    };

    createRecord(newRecord);

    // reset form //
    setDescription("");
    setAmount("");
    setCategory("");
    setPayment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] max-w-[500px] flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-black rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-black"
        >
          <option value="">Select a Category:</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="payment">Payment:</label>
        <select
          id="payment"
          name="payment"
          required
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="text-black"
        >
          <option value="">Select a Payment Method:</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        type="submit"
        className="text-lg font-medium border-2 rounded-md bg-slate-700"
      >
        Add
      </button>
    </form>
  );
};
