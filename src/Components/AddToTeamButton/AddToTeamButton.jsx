import { useDispatch } from 'react-redux'
import './AddToTeamButton.css'

const AddToTeamButton = ( {teamId,team} ) => {
    const dispatch = useDispatch()
    const openModal = (evt) => {
        // console.log(teamId,team)
        dispatch({ type:'team-id', payload: {
            teamId,
            team
        } })
        dispatch({ type:'modal-on' })
    }
    return (
        <button 
            className='add-team-btn'
            onClick={openModal}
        >+</button>
    )
}

export default AddToTeamButton