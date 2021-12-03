import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect } from 'react';
 
function Map({selectedFilter}){
    const API_KEY = "AIzaSyDZmhBETb4d7U-Qk5NN4ZLz7MB0BPqlc9M"
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: API_KEY
    })
    
    useEffect(() => {
        if (isLoaded){ // si api google est chargé
            const map = new window.google.maps.Map(document.getElementById('Map'), {
                zoom: 12,
                center: { lat: 48.864716, lng: 2.349014 }
            })

            /*map.data.forEach((feature) => { // on néttoie la map
                map.data.remove(feature)    
            })*/

            map.data.loadGeoJson("http://localhost:3001/api/data/positions/" + selectedFilter); // on y charge les nouvelles donnés en fonction du filtre

            // Show the information for a store when its marker is clicked.
            const infoWindow = new window.google.maps.InfoWindow();
            map.data.addListener('click', (event) => {
                const annee_tournage = event.feature.getProperty('annee_tournage');
                const type_tournage = event.feature.getProperty('type_tournage');
                const nom_producteur = event.feature.getProperty('nom_producteur');
                const IBRAHIM = event.feature.getProperty('IBRAHIM');
                const nom_realisateur = event.feature.getProperty('nom_realisateur');
                const position = event.feature.getGeometry().get();
                const content = `
                <span>${annee_tournage}<span><b>
                <span>${type_tournage}<span><b>
                <span>${nom_producteur}<span><b>
                <span>${IBRAHIM}<span><b>
                <span>${nom_realisateur}<span><b>
                `;

                infoWindow.setContent(content);
                infoWindow.setPosition(position);
                infoWindow.setOptions({pixelOffset: new window.google.maps.Size(0, -30)});
                infoWindow.open(map);
            });
            
        }
    },[isLoaded, selectedFilter])



    if (isLoaded){
        return(
            <div id="Map">
                
            </div>
        )
    } else return (
        <div id="loading"></div>
    )
} 

export default Map