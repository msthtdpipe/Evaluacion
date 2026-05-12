const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

// Usamos GET porque ahora leemos un archivo local y no enviamos body
router.get('/scrape', scrapeController.iniciarScraping);

module.exports = router;