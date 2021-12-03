import { useState, useEffect } from "react";

function useFetch(url){
    const [isLoaded, updateIsLoaded ] = useState(false)
    const [ data, setData ] = useState({})

    useEffect( () => {
        fetch(url)
        .then((response) => response.json())
        .then((newData) => setData(newData))

        .catch((error) => console.log(error))
        .then(() => updateIsLoaded(true))
    },[])

    return { isLoaded, data }
}


function useSelectedFilter(url, selectedFilter){
    const { data, setData } = useState({})
    const [isLoaded, updateIsLoaded ] = useState(false)

    useFetch(url + selectedFilter)
}

export default useFetch