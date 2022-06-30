const Sauces = require("../models/sauces");

module.exports = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId === req.auth.id) {
                next();
            } else {
                res.status(401).json({ error: "Vous n'êtes pas autorisé à effectuer cette action" });
            }
        })
        .catch(error => res.status(404).json({ error }));

};