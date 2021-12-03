const express = require('express');
const router = express.Router();

const filtersCtrl = require('../controllers/filters.js');
const positionsCtrl = require('../controllers/positions')

router.get('/filters', filtersCtrl.getAll);
router.get('/positions/all', positionsCtrl.getAll)
router.get('/positions/:district', positionsCtrl.getByDistrict)


module.exports = router