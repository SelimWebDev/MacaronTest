//Composant qui charge qui recois le filtre par défaut ou le filtre sélectionné, il charge l'api google,
// créer la map, et demande les geoJson à l'API en fonction du filtre

import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect } from 'react';
 
function Map({selectedFilter}){
    const API_KEY = "AIzaSyDZmhBETb4d7U-Qk5NN4ZLz7MB0BPqlc9M"
    const { isLoaded } = useJsApiLoader({                                                       // on charge l'api google
      id: 'google-map-script',
      googleMapsApiKey: API_KEY
    })
    
    useEffect(() => {
        if (isLoaded){                                                                          // si api google est chargé
            const map = new window.google.maps.Map(document.getElementById('Map'), {            // on créer la map
                zoom: 12,
                center: { lat: 48.864716, lng: 2.349014 }
            })
            if(selectedFilter === ""){                                              //si auccun filtre sélectionné
                map.data.loadGeoJson("http://localhost:3001/api/data/filters")    // on charge tout arrondissements
            } else {
                map.data.loadGeoJson("http://localhost:3001/api/data/filters/" + selectedFilter)    // on y charge l'arrondissement select
                map.data.loadGeoJson("http://localhost:3001/api/data/positions/" + selectedFilter); // on y charge les positions
    
                // Show the information for a store when its marker is clicked.
                const infoWindow = new window.google.maps.InfoWindow();                             // on créer une infoWindow
                map.data.addListener('click', (event) => {                                          // lister click sur la map
                    const annee_tournage = event.feature.getProperty('annee_tournage');             // on ajoute les propriété de la position cliqué
                    const type_tournage = event.feature.getProperty('type_tournage');               // a infowWindow
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