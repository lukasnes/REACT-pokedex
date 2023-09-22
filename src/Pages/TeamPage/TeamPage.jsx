import Team from '../../Components/Team/Team'
import './TeamPage.css'
import { useLoaderData,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const TeamPage = () => {
    let loggedIn = useSelector(state => state.loggedIn)
    let navigate = useNavigate()

    useEffect(() => {
        if(!loggedIn){
            navigate('/')
        }
    },[])
    // console.log(teamData)
    return (
        <section id="team-view">
            <section id="team-display">

            </section>
        </section>
    )
}

export default TeamPage