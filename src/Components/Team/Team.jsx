import { capitalize } from '../../utils/utils'
import AddToTeamButton from '../../Components/AddToTeamButton/AddToTeamButton.jsx'
import './Team.css'

const Team = ({team}) => {
    let { teamId,teamName,teamPokemons } = team
    let monDisplay = teamPokemons.map(({pokemon,spriteUrl},index) => {
        return (
            <div key={index} className='mon-container'>
                <h2>{capitalize(pokemon)}</h2>
                <img src={spriteUrl} alt={pokemon} />
            </div>
        )
    })
    if(monDisplay.length < 6){
        monDisplay.push(<AddToTeamButton teamId={teamId}/>)
    }
    return (
        <div 
            key={teamId} 
            className="team-card"
        >
            <h1 className='team-name'>{teamName}</h1>
            <div className='team-container' key={teamId}>
                {monDisplay}
            </div>
        </div>
    )
}

export default Team