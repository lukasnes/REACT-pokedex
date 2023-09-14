import './Pokedex.css'
import { useLoaderData } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { capitalize } from '../../utils/utils'
import axios from 'axios'

export default function Pokedex(){
    const { pokemon,bulbasaur } = useLoaderData()
    // console.log(bulbasaur)
    const createDisplay = (mon) => {
        let { id, name, types, sprites: {front_default}} = mon
        name = capitalize(name)
        // console.log(front_default)
        return (
            <div id="poke-container" key={id}>
                <header id="poke-header">
                    <p id="dex-order">{id}</p>
                    <h1 id="poke-name">{name}</h1>
                    <ul>
                        Types:
                        {types.map(({type},index) => {
                            type.name = capitalize(type.name)
                        return (
                        <li key={index}>
                            {type.name}
                        </li>)
                        })}
                    </ul>
                </header>
                <section>
                    <img src={front_default} />
                </section>
            </div>
        )
    }

    const [displayPokemon,setDisplayPokemon] = useState(bulbasaur.name)
    const [display,setDisplay] = useState(createDisplay(bulbasaur))

    useEffect(() => {
        const getPokemon = async(url) => {
            const { data } = await axios.get(url)
            // console.log(data)
            setDisplay(createDisplay(data))
        }
        getPokemon(`https://pokeapi.co/api/v2/pokemon/${displayPokemon}`)
    },[displayPokemon])

    return (
        <section id="dex-container">
            <form>
                <select name="poke-select" id="poke-select" onChange={(evt) => setDisplayPokemon(evt.target.value)}>
                    {pokemon.map((mon,index) => {
                        return (
                            <option key={index} value={mon.name}>{capitalize(mon.name)}</option>
                        )
                    })}
                </select>
            </form>
            {display}
        </section>
    )
}