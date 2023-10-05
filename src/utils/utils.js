const capitalize = str => {
    str = str.split('-')
    str = str.map(word => word[0].toUpperCase() + word.slice(1))
    return str.join('-')
}
const colorPicker = (type) => {
    let colors = {
        grass: 'rgba(12,206,107,0.8)',
        poison: 'rgba(155,93,229,0.8)',
        bug: 'rgba(248,198,48,0.8)',
        water: 'rgba(48,107,172,0.8)',
        normal: 'rgba(125,125,125,0.8)',
        flying: 'rgba(255,255,255,0.8)',
        fighting: 'rgba(163,34,52,0.8)',
        rock: 'rgba(231,188,145,0.8)',
        ground: 'rgba(139,94,52,0.8)',
        psychic: 'rgba(255,92,138,0.8)',
        ice: 'rgba(122,231,199,0.8)',
        dragon: 'rgba(2,53,136,0.8)',
        electric: 'rgba(248,198,48,0.8)',
        fire: 'rgba(239,130,24,0.8)',
        fairy: 'rgba(249,190,199,0.8)',
        steel: 'rgba(152,193,217,0.8)',
        ghost: 'rgba(101,8,213,0.8)'
    }
    return colors[type]
}

export {capitalize,colorPicker}