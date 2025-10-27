const express = require('express');
const router = express.Router();
const matbangController = require('../app/controllers/SiteController');

router.get('/', matbangController.matbang);

module.exports = router;
