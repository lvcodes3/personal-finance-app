import "dotenv/config";

import express, { Express } from "express"; // express backend web server //
import cors from "cors"; // cross origin requests (client <=> server) //
import mongoose from "mongoose"; // mongodb connection //

import financialRecordRouter from "./routes/financialRecords";

const PORT = process.env.PORT || 5001;

const app: Express = express();

app.use(express.json());
app.use(cors());

// mongodb connection //
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}

// routes //
app.use("/financial-records", financialRecordRouter);

// main //
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
