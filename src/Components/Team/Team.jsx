import { useState } from 'react'
import axios from 'axios'
import AddToTeamButton from '../../Components/AddToTeamButton/AddToTeamButton.jsx'
import './Team.css'
import MonContainer from '../MonContainer/MonContainer.jsx'

const Team = ({team}) => {
    let { teamId,teamName,teamPokemons } = team
    const [isHovering,setIsHovering] = useState(false)
    const [isEditing,setIsEditing] = useState(false)
    const [nameOfTeam,setNameOfTeam] = useState(teamName)
    const [changeName,setChangeName] = useState(teamName)
    let monDisplay = teamPokemons.map(({name,spriteUrl},index) => {
        return (
            <MonContainer key={index} name={name} sprite={spriteUrl} teamId={teamId} />
        )
    })
    monDisplay.push(<AddToTeamButton teamId={teamId} team={teamPokemons}/>)
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