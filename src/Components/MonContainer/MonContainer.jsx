import { capitalize } from "../../utils/utils"

const MonContainer = ({ name,sprite }) => {
    return (
        <div className='mon-container'>
            <h2>{capitalize(name)}</h2>
            <img className='team-poke-sprite' src={sprite} alt={name} />
        </div>
    )
}
export default MonContainer