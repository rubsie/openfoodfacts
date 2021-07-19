import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {PokemonCard} from "./PokemonCard";

export function PokemonList() {
    const {
        shownPokemon, removePokemon
    } = useShownPokemonsContext();

    return <>
        {shownPokemon.map(pokemon => {
            return <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onRemoveClick={removePokemon} />
        })}
    </>;
}