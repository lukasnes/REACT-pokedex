import { capitalize } from '../../utils/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddToTeamButton from '../../Components/AddToTeamButton/AddToTeamButton.jsx'
import './Team.css'

const Team = ({team}) => {
    let { teamId,teamName,teamPokemons } = team
    const [isHovering,setIsHovering] = useState(false)
    const [isEditing,setIsEditing] = useState(false)
    const [nameOfTeam,setNameOfTeam] = useState(teamName)
    const [changeName,setChangeName] = useState(teamName)
    const navigate = useNavigate()
    let monDisplay = teamPokemons.map(({name,spriteUrl},index) => {
        return (
            <div key={`${name}-${teamId}`} className='mon-container'>
                <h2>{capitalize(name)}</h2>
                <img className='team-poke-sprite' src={spriteUrl} alt={name} />
            </div>
        )
    })
    if(monDisplay.length < 6){
        monDisplay.push(<AddToTeamButton teamId={teamId} team={teamPokemons}/>)
    }
    const editTeam = async(evt) => {
        const {data} = await axios.post(`/teams/edit-team/${teamId}`, { teamName: nameOfTeam })
        if(data){
            setIsEditing(false)
            setChangeName(data.teamName)
        }
    }
    return (
        <div 
            key={teamId} 
            className="team-card"
        >
            <img 
                src={isHovering ? 
                    '../../../public/img/icons/info-square-fill.svg'
                    :
                    '../../../public/img/icons/info-square.svg'}
                alt="team-info" 
                className='team-info'
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                onClick={() => navigate(`/team/${teamId}`)}
            />
            <div className='team-pokemon'>
                {isEditing ?
                <header className='team-header'>
                    <input 
                        type="text"
                        value={nameOfTeam}
                        maxLength={20}
                        onChange={(e) => setNameOfTeam(e.target.value)} 
                    /> 
                    <img 
                        className="edit-icon"
                        src="../../../public/img/icons/pencil.svg"
                        onClick={editTeam}
                    />
                </header>
                : 
                <header 
                    className='team-header'
                    style={{cursor: 'pointer'}}
                    onClick={(e) => setIsEditing(true)}
                >
                    <h1 className='team-name'>{changeName}</h1>
                    <img 
                        className="edit-icon"
                        src="../../../public/img/icons/pencil.svg"
                    />
                </header>}
                <div className='team-container' key={teamId}>
                    {monDisplay}
                </div>
            </div>
        </div>
    )
}

export default Team