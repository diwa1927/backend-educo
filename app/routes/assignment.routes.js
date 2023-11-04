module.exports = function(app) {
    const {google} = require("googleapis");
    const axios = require("axios");
    const json2xls = require('json2xls');

    app.get("/api/getassignments", async(req, res) => {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentials.json",
                scopes: "https://www.googleapis.com/auth/spreadsheets",
            });
            
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
            console.error('Error fetching data from Google Sheets:', error);
            res.status(500).json({ message: 'Internal server error' });
            }
    });
    app.get("/download", async(req, res) => {
        
        const response = await axios.get("http://localhost:8080/api/getassignments");

        
        // Convert JSON data to XLSX and send it as a response
        const xls = json2xls(response.data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader('Content-Disposition', 'attachment; filename=data_assignments.xlsx');
        res.end(xls, 'binary');
        console.log('Data yang di download :', response.data);
    });
};