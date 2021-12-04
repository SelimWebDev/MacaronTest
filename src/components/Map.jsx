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
            if(selectedFilter === "default"){                                      //si auccun filtre sélectionné
                map.data.loadGeoJson("http://localhost:3001/api/data/filters")    // on charge tout arrondissements
            } else {
                map.data.loadGeoJson("http://localhost:3001/api/data/filters/" + selectedFilter)    // on y charge l'arrondissement select
                map.data.loadGeoJson("http://localhost:3001/api/data/positions/" + selectedFilter,{idPropertyName: 'positions'}); // on charge les position

                map.data.setStyle(function(feature) {
                    if (feature.getProperty('annee_tournage')) {
                      return {
                          icon: {
                              url: 'https://image.flaticon.com/icons/png/512/60/60765.png',
                              scaledSize: new window.google.maps.Size(8, 8)
                          }
                      }
                    } 
                  });
                
                
                // Show the information for a store when its marker is clicked.
                const infoWindow = new window.google.maps.InfoWindow();                             // on créer une infoWindow
                map.data.addListener('click', (event) => {                                          // listener click sur la map.data
                    if(event.feature.getProperty("annee_tournage")){                                // si on click sur un point
                        const annee_tournage = event.feature.getProperty('annee_tournage');         // on ajoute les propriété de la position cliqué
                        const type_tournage = event.feature.getProperty('type_tournage');           // a infowWindow
                        const nom_producteur = event.feature.getProperty('nom_producteur');
                        const nom_tournage = event.feature.getProperty('nom_tournage');
                        const nom_realisateur = event.feature.getProperty('nom_realisateur');
                        const date_fin = event.feature.getProperty('date_fin');
                        const date_debut = event.feature.getProperty('date_debut');
                        const adresse_lieu = event.feature.getProperty('adresse_lieu');
                        
                        
                        const position = event.feature.getGeometry().get();
                        const content = `
                        <span>année de tournage : ${annee_tournage}<span><b><br>
                        <span>type de tournage : ${type_tournage}<span><b><br>
                        <span>nom du producteur : ${nom_producteur}<span><b><br>
                        <span>nom du tournage : ${nom_tournage}<span><b><br>
                        <span>nom du réalisateur : ${nom_realisateur}<span><b><br>
                        <span>date de début : ${date_debut}<span><b><br>
                        <span>date de fin : ${date_fin}<span><b><br>
                        <span>adresse du lieur : ${adresse_lieu}<span><b>
                        `;
        
                        infoWindow.setContent(content);
                        infoWindow.setPosition(position);
                        infoWindow.setOptions({pixelOffset: new window.google.maps.Size(0, -30)});
                        infoWindow.open(map);
                    }                                         
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