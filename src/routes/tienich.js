const express = require('express');
const router = express.Router();
const tienichController = require('../app/controllers/SiteController');

router.get('/', tienichController.tienich);

module.exports = router;
