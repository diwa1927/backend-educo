const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
//const Role = db.role;
//const Assignment = db.assignment;
db.sequelize.sync();
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db with { force: true }.");
    initial();
});*/

app.get('/', (req,res) => {
    res.json({ message: "Welcome to Database Educo, database is connected!"})
});

app.post("/compile", async (req, res) => {
    let code = req.body.code;
    let userInput = req.body.userInput;
    let data = {
        files: [
        {
            name: `main.cpp`,
            content: code,
        },
        ],
        stdin: userInput,
    };
    let config = {
        method: "post",
        url: `https://glot.io/api/run/cpp/latest`,
        headers: {
        "Content-Type": "application/json",
        Authorization: `Token 40f4948c-6825-417d-9038-6eaba9f89e35`,
        },
        data: data,
    };
    await axios(config).then((response) => {
        return res.status(200).json({ status: 200, data: response.data });
        }).catch(() => {
        return res.status(500).json({ error: "Internal Server Error" });
    });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/assignment.routes')(app);

app.listen(PORT, () => {
    console.log(` Server listening on port ${PORT} `);
});

/*function initial(){
    Role.create({
        id: 1,
        name: "siswa"
    });

    Role.create({
        id: 2,
        name: "guru"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
    
    Assignment.create({
        id: 1,
        name: "Tipe Data"
    });

    Assignment.create({
        id: 2,
        name: "Operator"
    });

    Assignment.create({
        id: 3,
        name: "Percabangan"
    });

    Assignment.create({
        id: 4,
        name: "Perulangan"
    });

    Assignment.create({
        id: 5,
        name: "Array"
    });
}*/