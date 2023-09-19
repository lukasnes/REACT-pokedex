import './Root.css'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'

export default function Root(){
    return (
        <>
            <Header/>

            <main id='main-body'>
                <Outlet />    
            </main>
        </>
    )
}