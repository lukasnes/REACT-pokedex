import { capitalize } from '../../utils/utils'
import { useState,useEffect } from 'react'
import './PokeSprite.css'
import { useSelector,useDispatch } from 'react-redux'

const PokeSprite = ({ pokemon,selected,setSelected,isFull,genNumber }) => {
    const dispatch = useDispatch()
    let { name, sprites: {front_default}, onTeam } = pokemon
    const [isSelected,setIsSelected] = useState(onTeam)
    const teamId = useSelector(state => state.teamId)
    const changeSelected = (evt) => {
        if(!teamId){
            dispatch({type: 'modal-off'})
            dispatch({type: 'set-mon', payload: pokemon})
            return
        }
        
        if(isSelected){
            setIsSelected(false)
            let newArray = [...selected]
            let index = newArray.findIndex(mon => mon.name === name)
            newArray.splice(index,1)
            setSelected(newArray)
        } else {
            if(!isFull){
                setIsSelected(true)
                pokemon.gen = genNumber
                setSelected([...selected,pokemon])
            }
        }
    }
    return (
        <div 
            className={`poke-sprite ${isSelected ? 'selected-sprite' : 'unselected-sprite'}`}
            onClick={changeSelected}
        >
            <h3>{capitalize(name)}</h3>
            <img src={front_default} alt="name" className='poke-sprite-img' />
        </div>
    )
}

export default PokeSprite