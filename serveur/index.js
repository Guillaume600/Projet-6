const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

let User;

app.use(express.json());
app.use(cors());

app.post("/api/auth/signup", (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.save()
        .then(() => {
            res.json({ message: "Ok" });
        })
        .catch((error) => {
            res.status(400);
            res.json({ message: "Erreur", erreur: error });
        });
});







app.get('/', (req, res) => {
    res.json({ message: "Hello World bis" });
});

app.listen(port, () => {
    mongoose.connect('mongodb://localhost/3000', function(err) {
        if (err) { throw err; }
        console.log(`Serveur lancé sur le ${port} et connecté à la base de données`);
        createModels();
    });
});

function createModels() {
    User = mongoose.model('User', {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });
};