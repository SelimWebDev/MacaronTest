const filters = require('../models/filters.json')       //fichier geoJson

exports.getAll = (req, res, next) => {                  // renvoie le fichier geoJson
    res.status(200).json(filters)
};

exports.getFilter = (req, res, next) => {                           // renvoie le feature arrondissement en fonction du code d'arrondissement recu
    var filter = {"type":"FeatureCollection","features":[]}
    var codeSelected = req.params.id

    filters.features.map((feature => {
        var featureCode = ""                                        // formattage du featureCode pour pouvoir le comparer au codeSelected
        featureCode = feature.properties.n_sq_ar
        featureCode = featureCode.toString()
        featureCode = featureCode[7] + featureCode[8]
        if(featureCode === codeSelected){
            filter.features.push(feature)
        }
    }))

    res.status(200).json(filter)
}

exports.getFilterNames = (req, res, next) => {                          // renvoie tout les noms des arrondissements
    var names = []
    filters.features.map((feature => {
        names.push({
            code: feature.properties.c_ar,
            name: feature.properties.l_ar
        })
    }))
    res.status(200).json(names)
}