import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useState} from "react";
import {Container, Row} from "react-bootstrap";
import {PokemonSelector} from "./components/pokemonSelector";
import {ShownPokemonsProvider} from "./contexts/shownPokemonsContext";
import {PokemonList} from "./components/PokemonList";


function ProvidedApp() {
    const [clickedPokemon, setClickedPokemon] = useState();

    return <Container fluid className="mt-3 mb-3">
        <h1>My Pokemons</h1>
        <Row>
            <PokemonSelector selectedPokemonId={clickedPokemon && clickedPokemon.id}/>
        </Row>
        <Row>
            <PokemonList setClickedPokemon={setClickedPokemon}/>
        </Row>
    </Container>;
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
