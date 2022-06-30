const Sauces = require("../models/sauces");

/*router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getSauceById);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
*/

exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getSauceById = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
    res.status(200).json({ message: "Ok" });
};

exports.updateSauce = (req, res, next) => {
    res.status(200).json({ message: "Ok" });
};

exports.deleteSauce = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    res.status(200).json({ message: "Ok" });
};