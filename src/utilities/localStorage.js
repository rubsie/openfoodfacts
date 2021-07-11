export function fromLocalStorage() {
    return JSON.parse(localStorage.getItem("pokemonIds")) || [];
}

export function toLocalStorage(shownPokemonIds) {
    localStorage.setItem("pokemonIds", JSON.stringify(shownPokemonIds));
}