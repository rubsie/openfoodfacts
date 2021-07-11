import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useState} from "react";
import {Container, Row} from "react-bootstrap";
import {PokemonSelector} from "./components/pokemonSelector";
import {Pokemon} from "./components/pokemon";
import {ShownPokemonsProvider, useShownPokemonsContext} from "./contexts/shownPokemonsContext";


function PokemonList(props) {
    const {setClickedPokemon} = props;
    const {shownPokemonIds, getPokemonDataWithId} = useShownPokemonsContext();
    return <>
        {shownPokemonIds.map(id => {
            const pokemon = getPokemonDataWithId(id);
            return <Pokemon key={id} pokemon={pokemon}
                            setSelectedPokemon={() => setClickedPokemon(pokemon)}/>
        })}
    </>;
}

function ProvidedApp() {
    const [clickedPokemon] = useState();

    return (<div>
            <Container fluid className="mt-3 mb-3">
                <h1>My Pokemons</h1>
                <Row>
                    <PokemonSelector selectedPokemonId={clickedPokemon && clickedPokemon.id}/>
                </Row>
                <Row>
                    <PokemonList setClickedPokemon/>
                </Row>
            </Container></div>
    );
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
