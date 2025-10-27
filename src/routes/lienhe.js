const express = require('express');
const router = express.Router();
const lienheController = require('../app/controllers/SiteController');

router.get('/', lienheController.lienhe);

module.exports = router;
