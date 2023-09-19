import './Pokedex.css'
import { useLoaderData } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Dex from '../../Components/Dex/Dex.jsx'
import DexSelect from '../../Components/DexSelect/DexSelect'

export default function Pokedex(){
    const { pokemon,bulbasaur } = useLoaderData()
    const [currentMon,setCurrentMon] = useState(bulbasaur)
    const [monName,setMonName] = useState(bulbasaur.pokemon)
    // console.log(bulbasaur)
    useEffect(() => {
        const getPokemon = async(url) => {
            const { data } = await axios.get(url)
            let { id, name:pokemon, types, sprites: {other,front_default:spriteUrl}, stats} = data
            let { front_default:imgUrl } = other['official-artwork']
            setCurrentMon({ id,types,pokemon,imgUrl,spriteUrl,stats })
        }
        getPokemon(`https://pokeapi.co/api/v2/pokemon/${monName}`)
    },[monName])

    return (
        <section id="dex-container">
            <DexSelect setMon={(evt) => setMonName(evt.target.value)} pokemon={pokemon}/>
            <Dex currentMon={currentMon} />
        </section>
    )
}