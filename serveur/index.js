/**
 * Pour pouvoir appeler et utiliser les extensions et les routes
 */
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const path = require('path');
const dotEnv = require("dotenv");
dotEnv.config();

const app = express();


/**
 * permet de monter la fonction middleware spécifiée
 */
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use('/images', express.static(path.join(__dirname, '../images')));

app.listen(process.env.PORT, () => {
    mongoose.connect('mongodb://localhost/3000', function(err) {
        if (err) { throw err; }
        console.log(`Serveur lancé sur le ${process.env.PORT} et connecté à la base de données`);
    });
});