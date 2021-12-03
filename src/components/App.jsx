import '../App.css';
import FilterSelect from './FilterSelect'
import Map from './Map'
import { useState, useEffect } from "react"
import useFetch from '../utils/hooks';  // hooks qui effectue une requete fetch et retourne les données

function App() {
  const [ selectedFilter, updateSelectedFilter ] = useState("all")

  var { isLoaded, data } = useFetch("http://localhost:3001/api/data/filters/") // requete initil pour récuperer les filtres
  const filtersJson = data
  const [ filtersList, updateFiltersList ] = useState([])

  useEffect(() => {
    if(isLoaded){
      let newFilterList = []
      filtersJson.features.map((feature) => {
        newFilterList.push(feature)
      })
      updateFiltersList(newFilterList)
    }
  },[filtersJson])


  return (
    <div>
      <FilterSelect filtersList={filtersList} update={updateSelectedFilter} />
      <Map selectedFilter={selectedFilter}/>
    </div>
    
  )
}

export default App;
