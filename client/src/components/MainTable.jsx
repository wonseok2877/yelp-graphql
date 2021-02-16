import React, { useContext, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANTS_QUERY } from '../gql/query'
import { RestaurantsContext } from '../context/Context'
import DeleteButton from './DeleteButton'

const MainTable = () => {
    const history = useHistory()
    // Context API
    const {restaurants, setR} = useContext(RestaurantsContext)
    const {loading, data}= useQuery(GET_RESTAURANTS_QUERY)
    
    if(loading){
        console.log("loading restaurants..."); 
    }
    /* ? : graphQL이 Context API를 쓰는 방법이 따로 있을 것 같다.
    이건 REST API스러워. 작동이 되기는 한다.
    Context의 state에다가 새로운 array를 만들어놨다. 다른 페이지에서
    mutation과 setState를 하면 자동 렌더링.  */

    /* ! : useQuery는 이미 effect hook의 성질을 갖고 있다.
    Yeah the useQuery should be already an "effect" hook, so you don't have to do that inside useEffect.
the useEffect was meant for async stuff, like fetch, but the useQuery 
is not an async function, it will immediately return result (loading:true, data:null).
 Then re-return the result when data is ready. so it does not have to be in useEffect.
     https://github.com/trojanowski/react-apollo-hooks/issues/158 */
    // useEffect 누가 설명좀 시팔
    useEffect(()=>{

        if(data){

            const fetchData = ()=>{
                try {
                    setR(data.getAllRestaurants)
                    console.log(data.getAllRestaurants);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData()
        }
        // 일단 매번 data를 가져오도록 땜빵해놓음
        },[data])
        console.log(data);

        const handleUpdateClick = (e, id) =>{
            e.stopPropagation()
            history.push(`/update/${id}`)
        }

        const handleRestaurantSelect = (e, id)=>{
            e.stopPropagation()
            history.push(`/detail/${id}`)
        }
        
    return (
        <div>
            <table className="table-fixed w-full">
                <thead className=" bg-green-700">
                    <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>

                {loading ? (
                    console.log("loading restaurants")
                ) : (
                restaurants && restaurants.map(r=>(
                <tbody key ={r.id} className="text-center bg-green-500">
                    <tr onClick={(e)=>handleRestaurantSelect(e,r.id)}>
                    <td>{r.name}</td>
                    <td>{r.location}</td>
                    <td>{"$".repeat(r.priceRange)}</td>
                    <td>{r.averageRating}</td>
                    <td>
                        {/* ? : 리액트의 대문자 소문자 법칙 
                         Warning: React does not recognize the `restaurantData` prop on a DOM element.
                        If you intentionally want it to appear in the DOM as a custom attribute, 
                        spell it as lowercase `restaurantdata` instead.*/}
                        <button onClick={(e)=>handleUpdateClick(e, r.id)}>Update</button>
                    </td>
                    <td>
                        <DeleteButton restaurantId={r.id}/>
                    </td>
                    </tr>
                </tbody>
                ) 
                ))}
            </table>
        </div>
    )
}

export default MainTable
