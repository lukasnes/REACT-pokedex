const capitalize = str => {
    str = str.split('-')
    str = str.map(word => word[0].toUpperCase() + word.slice(1))
    return str.join('-')
}

export {capitalize}