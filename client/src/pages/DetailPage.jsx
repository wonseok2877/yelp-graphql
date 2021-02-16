import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_A_RESTAURANT_QUERY } from '../gql/query';
import {CREATE_REVIEW_MUTATION} from '../gql/mutation'

const DetailPage = (props) => {
    const restaurantId = props.match.params.restaurantid
    console.log(restaurantId);
    const [username, setU] = useState("")
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("")

    /* ? : mutation 이후에 re-render 어떻게 함?
    ! : Query문에서 refetch함수를 준비시켜놓은 뒤,
    Mutation문에서 callback 함수로써 실행시킨다 ! */
    const {loading, error, data, refetch} = useQuery(GET_A_RESTAURANT_QUERY,{
        variables : {
            id : restaurantId
        }
    })

    const [createReview] = useMutation(CREATE_REVIEW_MUTATION, {
        variables : {
            restaurantId,
            username,
            content,
            rating : parseInt(rating),
        }
    },
    )

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await createReview()
            refetch()
            setU("")
            setContent("")
            setRating("")
        } catch (e) {
            throw new Error(e)
        }
    }


    return (
        <div>
            <h1>Detail Page</h1>
            { loading ? ( 
                <h1>loading data..</h1>
            ) : error ? (
                <h1>{error.message}</h1>
            ) : data ? (
                <div>
                    <h1>{data.getRestaurant.name}</h1>
                    <h1>{data.getRestaurant.location}</h1>
                    <h1>{data.getRestaurant.priceRange}</h1>
                </div>
                ) : (
                    <h1>no data</h1>
                )}
            <div className="flex flex-row flex-wrap justify-evenly w-100 mx-10 my-14">
                {loading ? (
                    <h1>loading data..</h1>
                ) : (
                    data.getRestaurant.reviews.length >= 1 && data.getRestaurant.reviews.map(v=>
                        (
                            <div className="w-1/4 h-40 mx-5 my-4 bg-yellow-500" key={v.id}>
                                <h2>name : {v.username}</h2>
                                <h2>content : {v.content}</h2>
                                <h2>rating : {v.rating}</h2>
                            </div>
                        ))
                )}
            </div>
            <div>
                <form onSubmit={e=>handleSubmit(e)}>
                    <input value={username} onChange={(e)=>setU(e.target.value)} type="text" className="border-8"/>
                    <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                    <select value={rating} onChange={(e)=>setRating(e.target.value)}>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default DetailPage
