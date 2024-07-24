import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { useFinancialRecord } from "../../contexts/financialRecordContext";

import { FinancialRecordForm } from "./FinancialRecordForm";
import { FinancialRecordList } from "./FinancialRecordList";

const Dashboard = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  if (!user) {
    navigate("/landing");
  }

  const { records } = useFinancialRecord();

  const totals = useMemo(() => {
    let totalAmount = 0;

    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="w-screen min-h-[calc(100vh-64px)] flex flex-col items-center gap-10">
      <h1 className="mt-10 text-center text-4xl font-semibold">
        Welcome {user?.firstName}!
      </h1>

      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-semibold">Add a Record</h2>
        <FinancialRecordForm />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-semibold">View Your Records</h2>
        <FinancialRecordList />
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold">Total ${totals}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
