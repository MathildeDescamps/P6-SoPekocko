const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauce = require('./models/Sauce');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//On importe les routes :
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//On connecte notre base de données à notre API :
mongoose.connect('mongodb://user:pass@localhost:27017/p6db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !' + error.message));


// On ajoute les headers pour éviter les erreurs de CORS :
var policy = "default-src 'self' *";
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Security-Policy', policy);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

module.exports = app;