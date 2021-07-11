export async function fetchOnePokemon(id) {
    console.log(`---fetch ${id} `)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`---fetch ${id} done`)
    const data = await response.json();
    console.log(`---fetch ${id} data `, data.id)

    function getImage() {
        return data.sprites.other["official-artwork"].front_default;
    }

    return {
        id: String(data.id),
        name: data.name,
        image: getImage(),
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
    console.log(`---fetch all data `, {data})
    return data.results.map(p => ({id: getIdFromUrl(p.url), name: p.name}));
}