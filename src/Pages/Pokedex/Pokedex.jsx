import './Pokedex.css'
import { useLoaderData } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { capitalize } from '../../utils/utils'
import axios from 'axios'
import Dex from '../../Components/Dex/Dex.jsx'

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
            <form>
                <select 
                    name="poke-select" 
                    id="poke-select" 
                    onChange={(evt) => setMonName(evt.target.value)}
                >
                    {pokemon.map((mon,index) => {
                        return (
                            <option key={index} value={mon.name}>{capitalize(mon.name)}</option>
                        )
                    })}
                </select>
            </form>
            <Dex currentMon={currentMon} />
        </section>
    )
}