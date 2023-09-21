import { useDispatch } from 'react-redux'
import './AddToTeamButton.css'

const AddToTeamButton = ( {teamId} ) => {
    const dispatch = useDispatch()
    const openModal = (evt) => {
        console.log(teamId)
        dispatch({ type:'team-id', payload: teamId })
        dispatch({ type:'modal-on' })
    }
    return (
        <button 
            className='add-team-btn'
            onClick={openModal}
        >Add New Pokemon</button>
    )
}

export default AddToTeamButton