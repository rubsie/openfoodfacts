function getImage(data) {
    return data.sprites.other["official-artwork"].front_default
}
export async function fetchOnePokemon(id) {
    console.log(`---fetch one ${id} `)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`---fetch one ${id} done`)
    const data = await response.json();
    console.log(`---fetch one ${id} done `, {data})
    return {
        id: String(data.id),
        name: data.name,
        image: getImage(data),
        types: data.types.map(t => t.type.name).join(", ")
    };
}

export async function fetchAllPokemon() {
    function getIdFromUrl(url) {
        const urlParts = url.split("/");
        return urlParts[urlParts.length - 2];
    }

    console.log(`---fetch all `)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=-1`);
    console.log(`---fetch all done`)
    const data = await response.json();
    console.log(`---fetch all done `, {data})
    return data.results.map(p => ({id: getIdFromUrl(p.url), name: p.name}));
}