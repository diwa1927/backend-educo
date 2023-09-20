const express = require('express');
const cors = require('cors'); 

const app = express();

const PORT = process.env.PORT || 8080;

// var corsOptions = {
//     origin: `${process.env.URL_HOST}`
// };

require('dotenv').config();

app.use(cors());

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

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/assignment.routes')(app);
require('./app/routes/compile.routes')(app);

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