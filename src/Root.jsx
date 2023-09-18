import './Root.css'
import Header from './Components/Header/Header'
import { useEffect,useState } from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Root(){
    const location = useLocation()
    const [loggedIn,setLoggedIn] = useState(false)

    useEffect(() => {
        const getLoginStatus = async() => {
            const { data } = await axios.get('/dex/auth/status')
            setLoggedIn(data.loggedIn)
        }
        getLoginStatus()
    },[location]) 

    return (
        <>
            <Header loggedIn={loggedIn}/>

            <main>
                <Outlet context={[loggedIn]}/>    
            </main>
        </>
    )
}