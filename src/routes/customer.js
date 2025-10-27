const express = require('express');
const router = express.Router();

// Import controller
const customerController = require('../app/controllers/CustomerController');

// Định nghĩa tuyến đường POST
// (Giống hệt cấu trúc bạn muốn: router.post('/store', ...))
router.post('/store', customerController.store);
router.post('/customer-register', customerController.registerPopup);

module.exports = router;