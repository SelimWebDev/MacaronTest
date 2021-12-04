// composant qui recois une liste de filtre et un update, il me modifie le state du parent en fonction du filtre sélectionné

function FilterSelect({filtersList, update}){

    function handleChange(e){              
        let districtSelected = ""
        if (e.target.value !== "default"){
            if ( e.target.value < 10){                              // on formate la valeur sélectionné 
                districtSelected = '0' + e.target.value
            } else {
                districtSelected = e.target.value
            }
    
        } else districtSelected = "default"
        update(districtSelected)                                // on update le state du composant parent
    }

    return (
        <div id="FilterSelect-layout">
            <div id="FilterSelect">
                <label htmlFor="district-select">Choisissez un arrondissement</label>

                <select name="districts" id="district-select" onChange={(e) => handleChange(e)}>

                    <option value="default"></option> 
                    {filtersList.map((filter, index) => (
                        <option key={index} value={filter.code}>{filter.name}</option>
                    ))}

                </select>
            </div>
        </div>
    )
}

export default FilterSelect