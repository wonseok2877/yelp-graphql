import { createContext, useState } from "react";

export const RestaurantsContext = createContext()

export const RestaurantContextProvider = props =>{
    console.log(props);
    const [restaurants, setR] = useState([])

    const [selectedRestaurant, setSR] = useState(null)

    const addRestaurants = (r)=>{
        setR([...restaurants, r])
    }

    return(
        <RestaurantsContext.Provider value={{restaurants, setR, addRestaurants,selectedRestaurant,setSR}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}