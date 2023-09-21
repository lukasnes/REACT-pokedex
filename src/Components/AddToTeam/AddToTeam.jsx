import './AddToTeam.css'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddToTeam = ({ currentMon }) => {
    const dispatch = useDispatch()
    let teamId = useSelector(state => state.teamId)
    const [isOnTeam,setIsOnTeam] = useState(false)
    const [teamOptions,setTeamOptions] = useState([])
    const [team,setTeam] = useState(teamId)

    const findIsOnTeam = async(id) => {
        let { data } = await axios.get(`/dex/team-pokemon/${id}`)
        console.log(data)
        if(data.some(pokemon => pokemon.pokemon === currentMon.pokemon)){
            setIsOnTeam(true)
        } else {
            setIsOnTeam(false)
        }
    }
    useEffect(() => {
        const findTeamPokemon = async() => {
            let {data} = await axios.get('/dex/team-pokemon')
            console.log(data)
            let options = data.map(team => {
                return (
                    <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                )
            })
            if(teamId === null){
                setTeamOptions(options)
                setTeam(data[0].teamId)
                findIsOnTeam(data[0].teamId)
            } else {
                findIsOnTeam(teamId)
            }
        }
        findTeamPokemon()
    },[])

    useEffect(() => {
        if(team != null){
            findIsOnTeam(team)
        }
    },[currentMon,team])

    const addToTeam = async(evt) => {
        console.log(teamId)
        let {data} = await axios.post(`/dex/add-to-team/${team}`,currentMon)
        if(data.success){
            setIsOnTeam(true)
        }
        if(teamId){
            dispatch({ type:'modal-off' })
            dispatch({ type:'no-team-id' }) 
        }
    }
    const removeFromTeam = async(evt) => {
        let {data} = await axios.post(`/dex/remove-from-team/${team}`, currentMon)
        if(data.success){
            setIsOnTeam(false)
        }
    }

    return (
        <div id="add-remove">
            {teamId ? <></> : <select 
                name="team-select" 
                id="team-select"
                onChange={(evt) => setTeam(evt.target.value)}
            >
                {teamOptions}
            </select>}
            
            {isOnTeam ? 
            <button 
            className='recruit-button remove'
            onClick={removeFromTeam}
            >Remove from Team</button> 
            : 
            <button 
            className='recruit-button add'
            onClick={addToTeam}
            >Add to Team</button>}
        </div>
    )
}

export default AddToTeam