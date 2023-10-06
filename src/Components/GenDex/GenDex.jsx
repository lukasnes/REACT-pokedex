import './GenDex.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import PokeSprite from '../PokeSprite/PokeSprite'

const GenDex = () => {
    const generations = [
        ['generation-i','I',1],
        ['generation-ii','II',2],
        ['generation-iii','III',3],
        ['generation-iv','IV',4],
        ['generation-v','V',5]
    ]
    const dispatch = useDispatch()
    const teamId = useSelector(state => state.teamId)
    const team = useSelector(state => state.team)
    const [selected,setSelected] = useState(team)
    const [hasSelected,setHasSelected] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    })
    const [genPokemon,setGenPokemon] = useState([])
    const [gen,setGen] = useState('generation-i')
    const [genNumber,setGenNumber] = useState(1)
    const [isLoading,setIsLoading] = useState(true)
    const [isFull, setIsFull] = useState(false)
    const sendSelected = async(e) => {
        let newTeam = selected.map((pokemon) => {
            let {name,imgUrl,spriteUrl,gen} = pokemon
            if(!imgUrl || !spriteUrl || !name || !gen){
                name = pokemon.name
                spriteUrl = pokemon['sprites']['front_default']
                imgUrl = pokemon['sprites']['other']['official-artwork']['front_default']
            }
            let monData = {
                name,
                spriteUrl,
                imgUrl,
                gen
            }
            return monData
        })
        let {data} = await axios.post(`/dex/add-to-team/${teamId}`, newTeam)
        if(data.success){
            dispatch({type: 'modal-off'})
        }
    }
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
                        let index = selected.findIndex(mon => mon.name === data.name)
                        if(index !== -1){
                            data.onTeam = true
                        } else {
                            data.onTeam = false
                        }
                    } else {
                        data.onTeam = false
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
            if(selected.length >= 6){
                setIsFull(true)
            } else {
                setIsFull(false)
            }
            let newHasSelected = {...hasSelected}
            for(let genNum in newHasSelected){
                console.log(genNum)
                if(selected.some((mon) => mon.gen === +genNum)){
                    console.log("hit")
                    newHasSelected[+genNum] = true
                } else {
                    newHasSelected[+genNum] = false
                }
            }
            setHasSelected(newHasSelected)
        }
        console.log(hasSelected)
    },[selected])
    
    return (
        <section id="gen-dex">
            <nav id='gen-selector'>
                {generations.map(([generation,genName,genNum]) => {
                    return (
                        <div 
                            key={generation} 
                            className={`
                                gen-tab 
                                ${generation === gen ? 'selected-tab' : 'unselected-tab'} 
                                `}
                            onClick={(e) => {
                                setGen(generation)
                                setGenNumber(genNum)
                                setIsLoading(true)
                            }}
                        >
                            <p className='gen-label'>{genName}</p>
                            {hasSelected[genNum] ? 
                            <img 
                                src="../../../public/img/icons/exclamation-circle-fill.svg" 
                                alt="exclamation mark"
                                className="has-selected-mark" 
                            /> 
                            : <></>}
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
                            genNumber={genNumber}
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
                <button 
                    id="add-to-team-btn"
                    onClick={sendSelected}
                >Add to Team</button>
            </div> : <></>
            }
        </section>
    )
} 

export default GenDex