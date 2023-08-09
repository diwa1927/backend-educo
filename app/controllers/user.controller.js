exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.siswaBoard = (req, res) => {
    res.status(200).send("Siswa Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.guruBoard = (req, res) => {
    res.status(200).send("Guru Content.");
};