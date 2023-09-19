import NewTeamButton from '../../Components/NewTeamButton/NewTeamButton'
import NewTeamForm from '../../Components/NewTeamForm/NewTeamForm'
import Team from '../../Components/Team/Team'
import './Teams.css'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Teams = () => {
    let { teamsData } = useLoaderData()
    const [isAdding,setIsAdding] = useState(false)
    const [teams,setTeams] = useState(teamsData)
    console.log(teams)
    let teamDisplay = teams.map(team => <Team key={team.teamId} team={team}/>)

    return (
        <section id="teams-page">
            <header id="new-team-container">
                {isAdding ? 
                <NewTeamForm 
                    stateChange={setIsAdding}
                    newTeams={setTeams}
                /> 
                : 
                <NewTeamButton 
                    onClick={(evt) => setIsAdding(true)}
                />}
            </header>
            <main id="teams-container">
                    {teamDisplay}
            </main>
        </section>
    )
}

export default Teams