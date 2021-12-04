module.exports = (req, res, next) => {
    var id = req.params.id
    if(typeof(id) === "string" && id.length === 2 && 0 < parseInt(id) < 21){
       next() 
    } else {
        res.status(400).json({error: "l'id reçu n'est pas conforme"})
    }
    
}