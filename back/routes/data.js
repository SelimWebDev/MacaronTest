const express = require('express');
const router = express.Router();

const filtersCtrl = require('../controllers/filters.js');
const positionsCtrl = require('../controllers/positions')

router.get('/filters/', filtersCtrl.getAll);                        // route qui renvoie toutes les features arrondissement
router.get('/filters/names', filtersCtrl.getFilterNames)            // route qui renvoie tout les noms d'arrondissements
router.get('/filters/:id', filtersCtrl.getFilter)                   // route qui renvoie le feature arrondissement demandé

router.get('/positions/:district', positionsCtrl.getByDistrict)     // route qui renvoie les features positions demandé


module.exports = router