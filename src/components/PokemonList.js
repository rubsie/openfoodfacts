import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {PokemonCard} from "./pokemonCard";

export function PokemonList(props) {
    const {setClickedPokemon} = props;
    const {shownPokemonIds, getPokemonDataWithId} = useShownPokemonsContext();
    return <>
        {shownPokemonIds.map(id => {
            const pokemon = getPokemonDataWithId(id);
            return <PokemonCard key={id} pokemon={pokemon}
                                setSelectedPokemon={() => setClickedPokemon(pokemon)}/>
        })}
    </>;
}