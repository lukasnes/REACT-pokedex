import { capitalize } from '../../utils/utils'
import { useState,useEffect } from 'react'
import './PokeSprite.css'
import { useSelector,useDispatch } from 'react-redux'

const PokeSprite = ({ pokemon,selected,setSelected }) => {
    console.log(pokemon)
    const dispatch = useDispatch()
    let { name, sprites: {front_default} } = pokemon
    const [isSelected,setIsSelected] = useState(false)
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
            setIsSelected(true)
            setSelected([...selected,pokemon])
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