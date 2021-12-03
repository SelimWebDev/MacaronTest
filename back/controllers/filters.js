const filters = require('../models/filters.json')

exports.getAll = (req, res, next) => {  
    res.status(200).json(filters)
};