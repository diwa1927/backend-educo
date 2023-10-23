module.exports = function(app) {
    const {google} = require("googleapis");
    const axios = require("axios");
    const fs = require("fs")

    fs.readFile('credentials.json', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan.', err);
            return;
        }

        JSON.parse(data);
    });

    app.get("/assignments", async (req,res) => {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        
        //Create client instance for Auth
        const client = await auth.getClient();

        //Instance of Google Sheets API
        const googleSheets = google.sheets({ version: "v4", auth: client });

        const spreadsheetId = "1c2JDLDsqw27Bwc754dqT3DHQtmM7jgbDM1Wl67LKSRg";
        //Get Metadata about spreadsheets
        // const metaData = await googleSheets.spreadsheets.get({
        //     auth,
        //     spreadsheetId,
        // });

        //Get rows about spreadsheets
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Assignments!A:E",
        });
        
        res.send(getRows.data);
    });

    app.get("/api/getassignments", async(req, res) => {
        try {
        
            const response = await axios.get(`http://localhost:8080/assignments`);
        
            // Mengirim data dari Google Sheets sebagai respons
            res.json(response.data);
            } catch (error) {
            console.error('Error fetching data from Google Sheets:', error);
            res.status(500).json({ message: 'Internal server error' });
            }
    });
};