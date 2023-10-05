import './Pokedex.css'
import { capitalize,colorPicker } from '../../utils/utils'
import { useSelector,useDispatch } from 'react-redux'
import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'

const Pokedex = () => {
    const dispatch = useDispatch()
    let currentMon = useSelector(state => state.currentMon)
    let { id,name,types,sprites:{other},stats } = currentMon
    let imgUrl = other['official-artwork']['front_default']
    let statsData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: colorPicker(types[0].type.name)
            }
        ]
    }
    let options = {
        scale: {
            min: 0,
            suggestedMax: 150,
            ticks: {
                stepSize: 50,
            },
        },
        elements: {
            point: {
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: colorPicker(types[0].type.name)
            }
        },
        scales: {
            r: {
                ticks: {
                    color: '#ffffff',
                    backdropColor: '#001A23'
                },
                pointLabels: {
                    color: '#ffffff',
                },
                grid: {
                    lineWidth: 2,
                    color: '#ffffff',
                },
                angleLines: {
                    color: '#ffffff'
                }
            }
        },  
        plugins: {
            legend: 
            {
                display: false
            }
        },
    }
    stats.map(({base_stat,stat: {name}}) => {
        // console.log(stat)
        statsData.labels.push(capitalize(name))
        statsData.datasets[0].data.push(base_stat)
    })
    const openModal = (evt) => {
        dispatch({type: 'modal-on'})
    }

    return (
        <div id="poke-container" key={id}>
            <aside id="poke-aside">
                <p id="dex-order">{id}</p>
                <h1 id="poke-name" className={types[0].type.name}>{capitalize(name)}</h1>
                <img id="poke-img" className={`${types[0].type.name}-bg`} src={imgUrl} />
                <button 
                    id='poke-search-btn'
                    onClick={openModal}
                >
                    Search for a Pokemon!
                </button>
            </aside>
            <section id="poke-info">
                <Radar id="stats-radar" data={statsData} options={options} />
                <ul id="types-list">
                    Types:
                    {types.map(({type},index) => {
                        return (
                            <li key={index} className={type.name}>
                        {capitalize(type.name)}
                    </li>)
                    })}
                </ul>
            </section>
        </div>
    )
}

export default Pokedex