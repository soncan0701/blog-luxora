const express = require('express');
const router = express.Router();
const giabanCOntroller = require('../app/controllers/SiteController');

router.get('/', giabanCOntroller.giaban);

module.exports = router;
