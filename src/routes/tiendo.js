const express = require('express');
const router = express.Router();
const tiendoController = require('../app/controllers/SiteController');

router.get('/', tiendoController.tiendo);

module.exports = router;
