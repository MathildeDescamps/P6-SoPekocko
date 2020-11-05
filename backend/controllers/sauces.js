//Dans ce fichier, on stock toute la logique métier de nos routes.

const Sauce = require('../models/Sauce');
const fs = require('fs');
const { splice } = require('core-js/fn/array');

// AJOUTER UNE SAUCE :
exports.addOneSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};


// RÉCUPÉRER UNE SAUCE :
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// MODIFIER UNE SAUCE :
exports.modifyOneSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//  SUPPRIMER UNE SAUCE :
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// RÉCUPÉRER TOUTES LES SAUCES :
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// LIKER OU DISLIKER UNE SAUCE : 

exports.likeDislikeSauce = (req, res, next) => {
    //On trouve dans la requête le userID et le numéro (1, -1 ou 0) pour like, dislike ou aucun des deux.
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like == 0) {
                //L'utilisateur annule son j'aime ou son j'aime pas.
                for (var user in sauce.usersLiked) {
                    if (sauce.usersLiked[user] == req.body.userId) {
                        sauce.likes--;
                        sauce.usersLiked.splice(user, 1);
                    }
                }
                for (var user in sauce.usersDisliked) {
                    if (sauce.usersDisliked[user] == req.body.userId) {
                        sauce.dislikes--;
                        sauce.usersDisliked.splice(user, 1);
                    }
                }
            } else if (req.body.like == 1) {
                sauce.likes++;
                sauce.usersLiked.push(req.body.userId);
            } else if (req.body.like == -1) {
                sauce.dislikes++;
                sauce.usersDisliked.push(req.body.userId);
            }
            Sauce.updateOne({ _id: sauce._id }, sauce)
                .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                .catch(error => res.status(400).json({ error }));
            res.status(200).json(sauce);
        })
        .catch(error => res.status(404).json({ error }));
};