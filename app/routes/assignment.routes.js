module.exports = function (app) {
  const { google } = require("googleapis");
  const axios = require("axios");
  const json2xls = require("json2xls");

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  app.get("/api/getassignments", async (_, res) => {
    try {
      //Create client instance for Auth
      const client = await auth.getClient();

      //Instance of Google Sheets API
      const googleSheets = google.sheets({ version: "v4", auth: client });

      const spreadsheetId = "1c2JDLDsqw27Bwc754dqT3DHQtmM7jgbDM1Wl67LKSRg";

      //Get rows about spreadsheets
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Assignments!A2:E",
      });

      const dataFromSheets = getRows.data.values;

      const formatData = dataFromSheets.map((row) => {
        return {
          Score: row[0], // Kolom A (indeks 0) dari rentang A1:E
          Nama: row[1], // Kolom B (indeks 1) dari rentang A1:E
          Kelas: row[2], // Kolom C (indeks 2) dari rentang A1:E
          Absen: parseInt(row[3]), // Kolom D (indeks 3) dari rentang A1:E
          Assignments: row[4], // Kolom E (indeks 4) dari rentang A1:E
        };
      });

      // Mengirim data dari Google Sheets sebagai respons
      res.json(formatData);
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/delete-assignments/:rowId", async (req, res) => {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1c2JDLDsqw27Bwc754dqT3DHQtmM7jgbDM1Wl67LKSRg";
    const rowId = req.params.rowId;

    // Pastikan bahwa rowId memiliki nilai yang sesuai
    if (!rowId) {
      return res.status(400).json({ error: "Invalid rowId" });
    }

    const range = `Assignments!A${rowId}:E${rowId}`;

    try {
      const response = await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
      });

      // Periksa keberhasilan operasi penghapusan
      if (response.status === 200) {
        res.status(200).json({ message: "Data deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete data" });
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  });
};
