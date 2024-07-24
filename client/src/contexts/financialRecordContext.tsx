import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
  _id?: string; // optional //
  userId: string;
  description: string;
  amount: number;
  category: string;
  payment: string;
  date: Date | string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  createRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, updatedRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

// provider component //
export const FinancialRecordProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useUser();

  const [records, setRecords] = useState<FinancialRecord[]>([]);

  const getRecords = async () => {
    if (!user) return;

    const response = await fetch(
      `http://localhost:5000/financial-records/getRecords/${user.id}`
    );

    if (response.ok) {
      const dbRecords = await response.json();
      console.log(dbRecords);

      if (dbRecords.length > 0) {
        // change date format for each record //
        dbRecords.forEach((record: FinancialRecord) => {
          record.date = new Date(record.date).toLocaleString();
        });

        console.log(dbRecords);

        setRecords(dbRecords);
      }
    }
  };

  useEffect(() => {
    getRecords();
  }, [user]);

  const createRecord = async (newRecord: FinancialRecord) => {
    const response = await fetch("http://localhost:5000/financial-records", {
      method: "POST",
      body: JSON.stringify(newRecord),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prevRecords) => [...prevRecords, newRecord]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateRecord = async (id: string, updatedRecord: FinancialRecord) => {
    const response = await fetch(
      `http://localhost:5000/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newUpdatedRecord = await response.json();
        setRecords((prevRecords) =>
          prevRecords.map((record) => {
            if (record._id === id) {
              return newUpdatedRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:5000/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, createRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecord must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
