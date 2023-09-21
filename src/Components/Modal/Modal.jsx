import { useSelector } from 'react-redux'
import Pokedex from '../Pokedex/Pokedex'
import './Modal.css'

const Modal = () => {
    let modal = useSelector(state => state.modal)
    return (
        <div style={{display:modal}} id="modal">
            <Pokedex />
        </div>
    )
}

export default Modal