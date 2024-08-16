import FinancialRecordModel from "../models/FinancialRecordModel.js";

const getAllByUserID = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching records for userId:', userId);
    const records = await FinancialRecordModel.find({ userId: userId });
    console.log('Found records:', records);
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).send(err.message);
  }
};

const createRecord = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    console.log('New record before save:', newRecord);
    const savedRecord = await newRecord.save();
    console.log('Saved record:', savedRecord);
    res.status(201).send(savedRecord);  // Changed status to 201 for resource creation
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).send(err.message);  // Send error message instead of entire error object
  }
};

const updateRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
};


export{
    getAllByUserID,
    createRecord,
    updateRecord,
    deleteRecord,
}