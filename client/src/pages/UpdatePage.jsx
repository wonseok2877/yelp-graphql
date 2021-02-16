import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UPDATE_RESTAURANT_MUTATION } from '../gql/mutation';
import { GET_A_RESTAURANT_QUERY } from '../gql/query';

const UpdatePage = (props) => {
    /* ? : 페이지가 이동할 때 data를 어떻게 보낼까?
    페이지가 바뀌면 부모쪽 component에선 data를 그대로 보내줄 수가 없다.
    1. context API에다가 담아서 공유한다.
    2. 지금처럼 useParams를 통해 얻은 id로 Query문을 다시 던진다.
    3. data를 그대로 보낼 수는 없나 ? */
    /* props.match.params : 결국 params를 쓰는구나ㅋㅋㅋ 
    ? : props는 어디서 온거고 어떻게 야무지게 쓸 수 있을끼.
    혹은 useParams() : params 즉 id를 구하는 함수. key가 id밖에 없음 */
    const restaurantId = props.match.params.restaurantid

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    /* ? : useQuerydhk useState가 계속 충돌한다. 답이 없네.
    Query문으로 받은 data를 local state로 만들 방법은 ? */
    const {loading, error, data} = useQuery(GET_A_RESTAURANT_QUERY,{
        variables : {
            id : restaurantId
        }
    })

    const [updateRestaurant] = useMutation(UPDATE_RESTAURANT_MUTATION,{
        variables : {
            id : restaurantId,
            name,
            location,
            priceRange,
        }
        
    })

if(loading) console.log("loading.");
    useEffect(()=>{
        if(data){
            const dataToState = ()=>{
                try {
                    setName(data.getRestaurant.name)
                    setLocation(data.getRestaurant.location)
                    setPriceRange(data.getRestaurant.priceRange)
                } catch (e) {
                    console.log(e);
                }
            }
            dataToState()
        }
        // 일단 매번 data를 가져오도록 땜빵해놓음 ? 설명 필요
    },[data])

    /* ? : 왜 Mutation함수를 함수안에 감싸서 하면 실행이 안될까
    : async&await  제발.. */
    /* ? : history.push()로 홈페이지로 가면 이름이 안바뀌어있다.
    state를 바꿔줘야 하는건가.
    이건 홈페이지쪽에서 바꿔야할까 이쪽에서 바꿔야 할까?
    apollo Context뭐시기 그거 쓰면 다 해결될 것 같긴 하다.....쉣 */

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await updateRestaurant()
        } catch (e) {
            throw new Error(e)
        }
        history.push("/")
    }
    const history = useHistory()
    

    return (
        <div>
            <form onSubmit={(e) =>handleSubmit(e)} >
                <div><input  value={name} onChange={e=>setName(e.target.value)} className="border-4 border-indigo-800 text-6xl" type="text"/></div>
                <div><input  value={location} onChange={e=>setLocation(e.target.value)} className="border-4 border-indigo-700 text-6xl" type="text"/></div>
                <div><input  value={priceRange} onChange={e=>setPriceRange(e.target.value)} className="border-4 border-indigo-700 text-6xl" type="number" min="1" max="5"/></div>
                <button type="submit"></button>
                </form>
            {loading ? (
                <h1>loading ..</h1>
            ) : (
                <h1>{data.getRestaurant.name}</h1>
            )}
        </div>
    )
}

export default UpdatePage
