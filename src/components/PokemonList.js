import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {PokemonCard} from "./PokemonCard";

export function PokemonList() {
    const {
        shownPokemon, setSelectedPokemon
    } = useShownPokemonsContext();

    return <>
        {shownPokemon.map(pokemon => {
            return <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                setSelectedPokemon={() => setSelectedPokemon(pokemon)} />
        })}
    </>;
}