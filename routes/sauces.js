const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce');
const saucesCtrl = require('../controllers/sauces');

// ROUTER SAUCES :
router.post('/', saucesCtrl.addOneSauce);
router.get('/:id', saucesCtrl.getOneSauce);
router.put('/:id', saucesCtrl.modifyOneSauce);
router.delete('/:id', saucesCtrl.deleteOneSauce);
router.get('/', saucesCtrl.getAllSauces);

module.exports = router;