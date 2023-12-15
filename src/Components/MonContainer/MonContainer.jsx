import { capitalize } from "../../utils/utils"
import { useNavigate } from 'react-router-dom'

const MonContainer = ({ name,sprite,teamId }) => {
    const navigate = useNavigate()
    return (
        <div 
            className='mon-container'
            onClick={() => navigate(`/team/${teamId}`)
            }>
            <h2>{capitalize(name)}</h2>
            <img className='team-poke-sprite' src={sprite} alt={name} />
        </div>
    )
}
export default MonContainer