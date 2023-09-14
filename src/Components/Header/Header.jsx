import './Header.css'

export default function Header(){
    return (
        <header id="site-header">
            <img src="../../../public/img/logos/pokeball.png"/>
            <img id="logo" src="../../../public/img/logos/poke_logo.png"/>
            <nav>
                <p>Home</p>
                <p>Profile</p>
            </nav>
        </header>
    )
}