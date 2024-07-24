import express, { Request, Response } from "express";

import FinancialRecordModel from "../schemas/financialRecord";

const router = express.Router();

// get all user records by user id //
router.get("/getRecords/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const records = await FinancialRecordModel.find({ userId });

    if (records.length === 0) {
      return res.status(404).send(`No records found for user id: ${userId}`);
    }

    return res.status(200).send(records);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// create user record //
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;

    const newRecord = new FinancialRecordModel(newRecordBody);

    const savedRecord = await newRecord.save();

    return res.status(200).send(savedRecord);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// update user record //
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedRecordBody = req.body;

    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      updatedRecordBody,
      { new: true }
    );

    if (!record) {
      return res.status(404).send(`No record found for record id: ${id}`);
    }

    return res.status(200).send(record);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// delete user record //
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).send(`No record found for record id: ${id}`);
    }

    return res.status(200).send(record);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
