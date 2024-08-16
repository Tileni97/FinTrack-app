import express from "express";
import {
  getAllByUserID,
  createRecord,
  updateRecord,
  deleteRecord
} from "../controllers/financialRecordController.js";

const router = express.Router();

router.get("/getAllByUserID/:userId", getAllByUserID);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;