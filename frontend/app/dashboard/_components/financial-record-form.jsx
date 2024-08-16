"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "./../../contexts/financial-record-context";

const FinancialRecordForm = () => {
  const { user } = useUser();
  const { addRecord } = useFinancialRecords();

  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newRecord = {
      userId: user.id,
      date: new Date(),
      description: description,
      amount: amount,
      category: category,
      paymentMethod: paymentMethod,
    };
    addRecord(newRecord);

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container bg-white shadow-md rounded px-6 py-4 mb-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Add Financial Record</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="type"
            >
              Type
            </label>
            <select
              id="type"
              className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="paymentMethod"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default FinancialRecordForm;
