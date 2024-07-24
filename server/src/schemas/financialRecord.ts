import mongoose from "mongoose";

interface FinancialRecord {
  userId: string;
  description: string;
  amount: number;
  category: string;
  payment: string;
  date: Date;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  payment: { type: String, required: true },
  date: { type: Date, required: true },
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordSchema
);

export default FinancialRecordModel;
