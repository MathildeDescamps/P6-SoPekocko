const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');


// ROUTER SAUCES :
router.post('/', auth, multer, saucesCtrl.addOneSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;