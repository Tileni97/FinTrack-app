"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Create the context
export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/financialRecords/getAllByUserID/${user.id}`
      );
      if (response.ok) {
        const fetchedRecords = await response.json();
        console.log(fetchedRecords);
        setRecords(fetchedRecords);
      } else {
        throw new Error("Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/financialRecords",
        {
          method: "POST",
          body: JSON.stringify(record),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      } else {
        throw new Error("Failed to add record");
      }
    } catch (error) {
      console.error("Error adding record:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecord = async (id, newRecord) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/financialRecords/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newRecord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record._id === id ? updatedRecord : record))
        );
      } else {
        throw new Error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating record:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/financialRecords/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <FinancialRecordsContext.Provider
      value={{
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);
  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
};
