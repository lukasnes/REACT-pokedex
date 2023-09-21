import './Root.css'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Modal from './Components/Modal/Modal'

export default function Root(){
    return (
        <>
            <Modal />
            <Header/>
            <main id='main-body'>
                <Outlet />    
            </main>
        </>
    )
}