module.exports = function (app) {
  const { google } = require("googleapis");
  const fs = require("fs");
  const path = require("path");
  const XLSX = require("xlsx");

  app.get("/api/getassignments", async (_, res) => {
    try {
      // Path to the uploaded file
      const filePath = path.resolve(__dirname, "../../assignment-educo.xlsx");

      // Function to convert Excel file to an array of objects
      function excelToJson(filePath) {
        // Read the file
        const fileBuffer = fs.readFileSync(filePath);
        // Parse the Excel file
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });
        // Assuming the data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // Convert the sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet);
        return data;
      }

      // Get the array of objects from the Excel file
      const dataArray = excelToJson(filePath);

      const formatData = dataArray?.map((item) => {
        return {
          Score: item.Score,
          Nama: item['Nama '],
          Kelas: item.Kelas,
          Absen: item["No. Absen"],
          Assignments: item["Assignment's"],
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
