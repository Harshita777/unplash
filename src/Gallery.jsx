import React from 'react'
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import { useGlobalContext } from './Context'


const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

console.log(import.meta.env.VITE_API_KEY);

const Gallery = () => {
    const {searchTerm} = useGlobalContext()
    const response = useQuery({
        queryKey: ["images",searchTerm],
        queryFn:async() => {
            const result = await axios.get(`${url}&query=${searchTerm}`)

            return result.data
        },
    })

    if(response.isLoading){
        return (
            <section className='image-container'>
                Loading...
            </section>
        )
    }

    if(response.isError){
        return (
            <section className='image-container'>
                There was an Error...
            </section>
        )
    }

    const results = response.data.results
    if(results.length < 1) {
        return (
            <section className='image-container'>
                No result found...
            </section>
        )
    }

    console.log(response);
  return (
    <section className='image-container'>
        {results.map((item) =>{
            const url = item?.urls?.regular;
            return(
                <img src={url} alt={item.alt_description} className='img' key={item.id}/>
                )
        })}
    </section>
  )
}

export default Gallery