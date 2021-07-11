import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {PokemonCard} from "./pokemonCard";

export function PokemonList() {
    const {shownPokemonIds, getPokemonDataWithId, setClickedPokemon} = useShownPokemonsContext();
    return <>
        {shownPokemonIds.map(id => {
            const pokemon = getPokemonDataWithId(id);
            return <PokemonCard key={id} pokemon={pokemon}
                                setSelectedPokemon={() => setClickedPokemon(pokemon)}/>
        })}
    </>;
}