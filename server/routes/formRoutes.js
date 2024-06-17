const express = require("express");
const FormEntry = require("../models/formEntry");
const sheets = require("../config/googleAuth");
const router = express.Router();

async function updateSheetData(data) {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const range = "Sheet1!A1";

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values: data,
      },
    });
    console.log("Sheet updated successfully");
  } catch (error) {
    console.error("Error updating sheet:", error);
  }
}

router.post("/form", async (req, res) => {
  const { formType, name, phoneNumber } = req.body;
  try {
    const newEntry = await FormEntry.create({ formType, name, phoneNumber });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Error creating form entry" });
  }
});

router.get("/form", async (req, res) => {
  try {
    const entries = await FormEntry.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form entries" });
  }
});

router.post("/refresh-sheet", async (req, res) => {
  try {
    const entries = await FormEntry.findAll();
    const data = entries.map((entry) => [
      entry.formType,
      entry.name,
      entry.phoneNumber,
    ]);

    await updateSheetData(data);
    res.status(200).json({ message: "Sheet updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating sheet" });
  }
});

module.exports = router;
