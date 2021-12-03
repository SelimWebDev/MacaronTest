// composant qui recois une liste de filtre et un update, il me modifie le state "filtre séléctioné" du parent

function FilterSelect({filtersList, update}){

    function handleChange(e){
        let districtSelected = ""
        if ( e.target.value < 10){
            districtSelected = '0' + e.target.value
        } else if ( e.target.value === ""){
            districtSelected = ""
        } else {
            districtSelected = e.target.value
        }
        update(districtSelected)
    }

    return (
        <div id="FilterSelect">
            <label htmlFor="district-select">Afficher par arrondissement</label>
            <select name="districts" id="district-select" onChange={(e) => handleChange(e)}>
                <option value="all"></option>
                {filtersList.map((filter, index) => (
                    <option key={index} value={filter.properties.c_ar}>{filter.properties.l_ar}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterSelect