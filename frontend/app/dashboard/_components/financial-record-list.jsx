"use client";

import React from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord, isLoading, error } =
    useFinancialRecords();

  console.log("Records:", records);

  if (isLoading) {
    return <div>Loading records...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!records || records.length === 0) {
    return <div>No records found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id} className="border-b">
              <td className="px-4 py-2">{record.description}</td>
              <td className="px-4 py-2">{record.amount}</td>
              <td className="px-4 py-2">{record.category}</td>
              <td className="px-4 py-2">{record.paymentMethod}</td>
              <td className="px-4 py-2">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteRecord(record._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecordList;
