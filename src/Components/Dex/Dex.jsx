import './Dex.css'
import { capitalize } from '../../utils/utils'
import { useOutletContext } from 'react-router-dom'
import AddToTeam from '../AddToTeam/AddToTeam'

const Dex = ({ currentMon }) => {
    let { id,pokemon,types,imgUrl,stats } = currentMon
    const [loggedIn] = useOutletContext()
    let statsDisplay = stats.map(stat => {
        // console.log(stat)
        let {base_stat, stat: {name}} = stat
        return (
            <div id="stat-container" key={name}>
                <label className={`${name}-stat`} htmlFor={`${name}-stat`}>{capitalize(name)}: </label>
                <p className={`${name}-stat`}>{base_stat}</p>
            </div>
        )
    })

    return (
        <div id="poke-container" key={id}>
            <header id="poke-header">
                <p id="dex-order">{id}</p>
                <h1 id="poke-name" className={types[0].type.name}>{capitalize(pokemon)}</h1>
                <ul id="types-list">
                    Types:
                    {types.map(({type},index) => {
                        return (
                            <li key={index} className={type.name}>
                        {capitalize(type.name)}
                    </li>)
                    })}
                </ul>
            </header>
            <section id="poke-info">
                <div id="stats-display">
                    {statsDisplay}
                </div>
                <img id="poke-img" src={imgUrl} />
                {loggedIn ? 
                <AddToTeam currentMon={currentMon}/> 
                : 
                <div 
                    id="add-remove" 
                    style={{color: 'var(--white)',fontSize: '1.5em',textAlign: 'center'}}
                >Login to build a team!</div>}
            </section>
        </div>
    )
}

export default Dex