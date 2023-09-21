import NewTeamButton from '../../Components/NewTeamButton/NewTeamButton'
import NewTeamForm from '../../Components/NewTeamForm/NewTeamForm'
import Team from '../../Components/Team/Team'
import './Teams.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

const Teams = () => {
    const modal = useSelector(state => state.modal)
    const [isAdding,setIsAdding] = useState(false)
    const [teams,setTeams] = useState([])

    useEffect(() => {
        const getTeams = async() => {
            let {data} = await axios.get('/teams/all-teams')
            setTeams(data)
        }
        getTeams()
    },[modal])
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