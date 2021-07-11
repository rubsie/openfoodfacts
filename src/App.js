import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {ListAllPokemons} from "./components/listAllPokemons";
import {fromLocalStorage, toLocalStorage} from "./utilities/localStorage";
import {Pokemon} from "./components/pokemon";
import {fetchOnePokemon} from "./utilities/fetch";


function App() {
    const [shownPokemonIds, setShownPokemonIds] = useState(() => fromLocalStorage());
    const [pokemons, setPokemons] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState();

    useEffect(() => {
        async function fetchShownPokemons() {
            toLocalStorage(shownPokemonIds);
            const idsToFetch = shownPokemonIds.filter(id => !pokemons.find(p => p.id === id));
            console.log(`fetchPokemon `, {idsToFetch});
            if (!idsToFetch.length) return;

            const fetchedData = await Promise.all(idsToFetch.map(id => fetchOnePokemon(id)));
            console.log({fetchedData});
            setPokemons([...pokemons, ...fetchedData]);
        }

        fetchShownPokemons();
    }, [shownPokemonIds, pokemons]);


    function addPokemon(id) {
        console.log(`add ${id}`);
        if (!shownPokemonIds.includes(id))
            setShownPokemonIds([...shownPokemonIds, id].sort((a, b) => Number(a) - Number(b)));
    }

    function removePokemon(id) {
        console.log(`remove ${id}`);
        if (shownPokemonIds.includes(id))
            setShownPokemonIds(shownPokemonIds.filter(i => i !== id));
    }

    console.log({shownPokemonIds});
    console.log({pokemons});
    if (!pokemons) return null;
    return (<div>
            <Container fluid className="mt-3 mb-3">
                <h1>My Pokemons</h1>
                <Row>
                    <ListAllPokemons
                        selectedPokemonId={clickedPokemon && clickedPokemon.id}
                        addPokemon={addPokemon}
                        removePokemon={removePokemon}
                        shownPokemonIds={shownPokemonIds}/>
                </Row>
                <Row>
                    {shownPokemonIds.map(id => {
                        const pokemon = pokemons.find(p => p.id === id);
                        return <Pokemon key={id} pokemon={pokemon}
                                        setSelectedPokemon={() => setClickedPokemon(pokemon)}/>
                    })}
                </Row>
            </Container></div>
    );
}

export default App;
