const positions = require('../models/positions.json')

exports.getAll = (req, res, next) => {                                                  // renvoie le fichier geoJson
    res.status(200).json(positions)
};

exports.getByDistrict = (req, res, next) => {                                           // renvoie les positions demandés
    var newJson = {"type":"FeatureCollection","features":[]}
    const codeSelected = req.params.id                                                // on récupère l'arrondissement demandé en parametre requete
    positions.features.map((feature) => {                                               // on parcour le tableau de lieu de tournage/feature
        var featureArr = ""
        if (feature.properties.ardt_lieu){                                               // si l'arrondissement est indiqué dans la feature
            featureArr = feature.properties.ardt_lieu[3] + feature.properties.ardt_lieu[4] // on formate le code d'arrondissement
        }

        if(codeSelected === featureArr){                                                // et on compare avec le code demandé
            newJson.features.push(feature)
        }
    })
    res.status(200).json(newJson)
};
