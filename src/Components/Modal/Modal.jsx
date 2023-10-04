import { useSelector,useDispatch } from 'react-redux'
import Pokedex from '../Pokedex/Pokedex'
import GenDex from '../GenDex/GenDex'
import './Modal.css'

const Modal = () => {
    const dispatch = useDispatch()
    let modal = useSelector(state => state.modal)
    const closeModal = (evt) => {
        dispatch({type: 'modal-off'})
        dispatch({type: 'no-team-id'})
    }
    return (
        <div style={{display:modal}} id="modal">
            <GenDex />
            <button 
                id="close-modal"
                onClick={closeModal}
            >X</button>
        </div>
    )
}

export default Modal