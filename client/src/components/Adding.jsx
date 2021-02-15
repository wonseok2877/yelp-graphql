import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { RestaurantsContext } from '../context/Context'
import { CREATE_RESTAURANT_MUTATION } from '../gql/mutation'

const Adding = () => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    // ? : 얘도 string으로 해야 돼? 디폴트값을 걍 숫자로 하면 안 됨?
    // ? : 왜 기본 state가 안 뜨지? select의 종특인건가.. 설명 필요 
    const [priceRange, setPrice] = useState("what the fuck")

    // Context  API ~
    const {addRestaurants} = useContext(RestaurantsContext)

    const [createRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION,{
        variables : {
            name,
            location,
            priceRange : parseInt(priceRange)
        }
    })
    /* 더 좋은 방법이 없을까 ? 어차피 함수로 mutation문이 정의되어있는데
    함수를 하나 더 만들어야 하나. 
    물론 Context 함수를 쓰려고 그러는거지만. */
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const createdRestaurant = await createRestaurant()
            console.log(createdRestaurant.data.createRestaurant);
            addRestaurants(createdRestaurant.data.createRestaurant)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form className="h-20 w-32" onSubmit={handleSubmit}>
                <div className="flex">
                        <input value={name} onChange={e=>setName(e.target.value)} type="text" className="text-3xl" placeholder="name" />
                        <input value={location} onChange={e=>setLocation(e.target.value)} type="text" className="text-3xl" placeholder="location"/>
                        <select value={priceRange} onChange={e=>setPrice(e.target.value)} className="">
                            <option disabled>Price Range~</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default Adding
