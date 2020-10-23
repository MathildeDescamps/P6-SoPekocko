const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//On crée le schéma de base de données pour les utilisateurs : on ajoute "unique: true" au champ email pour qu'il soit impossible d'avoir plusieurs comptes avec le même mail.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);