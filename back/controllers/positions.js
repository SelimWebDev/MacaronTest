const positions = require('../models/positions.json')
const emptyJson = require('../models/empty.json')

exports.getAll = (req, res, next) => {  
    res.status(200).json(positions)
};

exports.getByDistrict = (req, res, next) => {
    var newJson = {"type":"FeatureCollection","features":[]}
    const district = req.params.district                                                // on récupère l'arrondissement demandé en parametre requete
    console.log(district)
    positions.features.map((feature) => {                                               // on parcour le tableau de lieu de tournage/feature
        var featureArr = ""
        if (feature.properties.ardt_lieu){                                               // si l'arrondissement est indiqué dans la feature
            featureArr = feature.properties.ardt_lieu[3] + feature.properties.ardt_lieu[4] // on formate l'arrondissement et on sauvegarde
        }

        if(district === featureArr){    // si les arrondissements correspondent, on insère la feature dans le nouveau json
            newJson.features.push(feature)
        }
    })

    console.log(newJson.features.length)
    
    res.status(200).json(newJson)
};
