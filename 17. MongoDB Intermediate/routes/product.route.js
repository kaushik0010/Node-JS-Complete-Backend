const express = require('express');
const router = express.Router();
const { insertSampleProducts, getProductStats, getProductAnalysis } = require('../controller/product.controller');


router.post('/add', insertSampleProducts);
router.get('/stats', getProductStats);
router.get('/analysis', getProductAnalysis);

module.exports = router;