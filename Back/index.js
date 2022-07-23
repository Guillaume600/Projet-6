/**
 * Pour pouvoir appeler et utiliser les extensions et les routes
 */
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const path = require('path');
const dotEnv = require("dotenv");
dotEnv.config();
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limiter chaque adresse IP à 100 requêtes toutes les 15mn
    standardHeaders: true, // Renvoyer l'info de la limite atteinte aux `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
/**
 * permet de monter la fonction middleware spécifiée
 */
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(limiter);
// Routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use('/images', express.static(path.join(__dirname, './images')));

app.listen(process.env.PORT, () => {
    mongoose.connect(`mongodb+srv://guillaumes:${process.env.MONGO_PASS}@cluster0.hvjeb3q.mongodb.net/?retryWrites=true&w=majority`, function(err) {
        if (err) { throw err; }
        console.log(`Serveur lancé sur le ${process.env.PORT} et connecté à la base de données`);
    });
});