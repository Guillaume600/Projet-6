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
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauces({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => { res.status(201).json({ message: "Nouvelle sauce ajoutée !" }) })
        .catch(error => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
    /**
     * objet sauce
     */
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete sauceObject._userId;
    Sauces.findOne({ _id: req.params.id })
        .then(() => {
            Sauces.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch(error => res.status(400).json({ error }));
};

/**
 * Permet de liker ou disliker une sauce
 * @param {*} req la requête
 * @param {*} res la réponse
 * @param {*} next 
 */
exports.likeSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            // enlever like / dislike
            sauce.usersLiked = sauce.usersLiked.filter(like => {
                return like !== req.auth.userId;
            });
            sauce.usersDisliked = sauce.usersDisliked.filter(dislike => {
                return dislike !== req.auth.userId;
            });
            if (req.body.like === 1) {
                // ajouter like
                sauce.usersLiked.push(req.auth.userId);
            } else if (req.body.like === -1) {
                // ajouter dislike
                sauce.usersDisliked.push(req.auth.userId);
            }
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;
            sauce.save()
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};