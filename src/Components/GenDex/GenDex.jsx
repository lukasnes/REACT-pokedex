import './GenDex.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import PokeSprite from '../PokeSprite/PokeSprite'

const GenDex = () => {
    const generations = [
        ['generation-i','I'],
        ['generation-ii','II'],
        ['generation-iii','III'],
        ['generation-iv','IV'],
        ['generation-v','V']
    ]
    const teamId = useSelector(state => state.teamId)
    const team = useSelector(state => state.team)
    const [selected,setSelected] = useState([])
    const [genPokemon,setGenPokemon] = useState([])
    const [gen,setGen] = useState('generation-i')
    const [isLoading,setIsLoading] = useState(true)
    const [isFull, setIsFull] = useState(false)
    useEffect(() => {
        const findGen = async() => {
            let {data: {pokemon_species}} = await axios.get(`https://pokeapi.co/api/v2/generation/${gen}`)
            let pokemon = await Promise.all(
                pokemon_species.map(async(pokemon) => {
                    let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                        .catch(err => {
                            console.log(err)
                        }) ?? {data: null}
                    if(!data){
                        return
                    }
                    if(team){
                        for(let i = 0; i < team.length; i++){
                            if(team[i].name === data.name){
                                data.onTeam = true
                            } else {
                                data.onTeam = false
                            }
                        }
                    }
                    return data
                })
            )
            pokemon = pokemon.sort((a,b) => a.id - b.id)
            setGenPokemon(pokemon)
            setIsLoading(false)
        }
        findGen()
    },[gen,teamId])
    useEffect(() => {
        if(team){
            if(team.length + selected.length >= 6){
                setIsFull(true)
            } else {
                setIsFull(false)
            }
        }
    },[selected])
    
    return (
        <section id="gen-dex">
            <nav id='gen-selector'>
                {generations.map(([generation,genName]) => {
                    return (
                        <div 
                            key={generation} 
                            className={`gen-tab ${generation === gen ? 'selected-tab' : 'unselected-tab'}`}
                            onClick={(e) => {
                                setGen(generation)
                                setIsLoading(true)
                            }}
                        >
                            {genName}
                        </div>
                    )
                })}
            </nav>
            <div>
                {isLoading ? 
                    <p>No results yet...</p>
                 : 
                <div id='gen-mon-container'> 
                    {genPokemon.map((pokemon,index) => {
                        if(!pokemon){
                            return <></>
                        }
                        return <PokeSprite 
                            selected={selected} 
                            setSelected={setSelected}
                            isFull={isFull}
                            key={index} 
                            pokemon={pokemon}
                        />
                    })}
                </div>}
            </div>
            { teamId && !isLoading ? 
            <div id="team-builder-container">
                {isFull ? 
                    <p id="team-builder-message">Your team is full!</p> 
                    : 
                    <p id="team-builder-message">Select Pokemon to add to your Team!</p>}
                <button id="add-to-team-btn">Add to Team</button>
            </div> : <></>
            }
        </section>
    )
} 

export default GenDex