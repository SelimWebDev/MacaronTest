// composant parent

import '../App.css';
import FilterSelect from './FilterSelect'
import Map from './Map'
import { useState } from "react"
import useFetch from '../utils/hooks';  // hooks qui effectue une requete fetch et retourne les données

function App() {
  const [ selectedFilter, updateSelectedFilter ] = useState("default")                // state fitre sélectionné

  var { isLoaded, data } = useFetch("http://localhost:3001/api/data/filters/names")    // requete initil pour récuperer les noms d'arrondissements
  const filtersList = data

  return (
    <div id="App">
      {isLoaded && <FilterSelect  filtersList={filtersList} update={updateSelectedFilter}/>}      
      <Map selectedFilter={selectedFilter}/>
    </div>
    
  )
}

export default App;
