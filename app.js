const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauce = require('./models/Sauce');

//On connecte notre base de données à notre API.
mongoose.connect('mongodb://user:pass@localhost:27017/p6db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !' + error.message));


// On ajoute les headers pour éviter les erreurs de CORS :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces', (req, res, next) => {
    const sauces = [{
            id: 'oeihfzeoi',
            userId: 'Mon premier objet',
            name: 'Les infos de mon premier objet',
            manufacturer: 'no idea part 1',
            description: 'spicy and sour cream',
            mainPepper: 'bell pepper',
            imageUrl: '',
            heat: 30,
            likes: 455,
            dislikes: 102,
            usersLiked: ['Joe', 'Clara', 'Stouff', 'Damiano'],
            usersDisliked: ['Jean', 'Anonymous', 'SpicyChicken'],

        },
        {
            id: 'oeihfzeoihufjt',
            userId: 'Mon deuxième objet',
            name: 'Les infos de mon deuxième objet',
            manufacturer: 'no idea part 2',
            description: 'creamy deluxe',
            mainPepper: 'jalapeno',
            imageUrl: '',
            heat: 30,
            likes: 455,
            dislikes: 102,
            usersLiked: ['Joe', 'Clara', 'Stouff', 'Damiano'],
            usersDisliked: ['Jean', 'Anonymous', 'SpicyChicken'],
        },
    ];
    res.status(200).json(sauces);
});

module.exports = app;