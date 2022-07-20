const Sauces = require("../models/sauces");
const fs = require("fs");

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

/**
 * Permet de créer une sauce et de l'associer à un user id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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

/**
 * Permet de modifier une sauce à condition qu'elle ait été créée par le même ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete sauceObject._userId;
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            //si fichier modifié
            if (req.file) {
                const sauceImageUrl = sauce.imageUrl.split("/").pop();
                fs.rm(`./images/${sauceImageUrl}`, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            Sauces.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/**
 * Permet de supprimer une sauce à condition qu'elle ait été créée par le même ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            const sauceImageUrl = sauce.imageUrl.split("/").pop();
            fs.rm(`./images/${sauceImageUrl}`, (error) => {
                if (error) {
                    res.status(400).json({ error });
                } else {
                    Sauces.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                        .catch(error => res.status(400).json({ error }));
                }
            });
        })
        .catch(error => res.status(400).json({ error }));
};

/**
 * Permet de liker ou disliker une sauce
 * @param {JSON} req la requête
 * @param {JSON} res la réponse
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