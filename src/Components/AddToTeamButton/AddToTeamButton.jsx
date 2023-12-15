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
            className={`add-team-btn ${team.length === 0 ? 'no-team' : ''}`}
            onClick={openModal}
        >
            <img 
                src="../../../public/img/icons/feather.svg" 
                alt="feather" 
            />
        </button>
    )
}

export default AddToTeamButton