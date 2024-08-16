"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import FinancialRecordForm from "./_components/financial-record-form";
import FinancialRecordList from "./_components/financial-record-list";

function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome {user?.firstName}! Here Are Your Finances:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>
          <FinancialRecordForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Your Financial Records
          </h2>
          <FinancialRecordList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
