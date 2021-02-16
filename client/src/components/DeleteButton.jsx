import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { RestaurantsContext } from '../context/Context'
import { DELETE_RESTAURANT_MUTATION } from '../gql/mutation'

const DeleteButton = ({restaurantId}) => {
    const {restaurants,setR} = useContext(RestaurantsContext)
    const [deleteRestaurant] = useMutation(DELETE_RESTAURANT_MUTATION,{
        variables : {
            id : restaurantId
        }
    })
    const handleDelete = async (e)=>{
        e.stopPropagation()
        const response = await deleteRestaurant()
        console.log(response);
        setR(restaurants.filter(r=>{
            return r.id !== restaurantId
        }))
    }
    return (
        <div>
            <button onClick={e=>handleDelete(e)} className="bg-red-700">Delete</button>
        </div>
    )
}

export default DeleteButton
