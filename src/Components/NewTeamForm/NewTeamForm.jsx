import './NewTeamForm.css'
import { useState } from 'react'
import axios from 'axios'

const NewTeamForm = ( {stateChange,setTeams} ) => {
    const [teamName,setTeamName] = useState("")
    const addNewTeam = async() => {
        let { data } = await axios.post('/teams/add-new', {teamName})
        setTeams(data)
        stateChange(false)
    }

    return (
        <form 
            id="new-team-form"
            onSubmit={addNewTeam}
        >
            <input 
                type="text"
                placeholder='Your Team Name'
                value={teamName}
                onChange={(evt) => setTeamName(evt.target.value)}
                required 
            />
            <button id="add-team-button">Add Team</button>
            <button id="cancel-add-button" onClick={(evt) => stateChange(false)}>Cancel</button>
        </form>
    )
}

export default NewTeamForm