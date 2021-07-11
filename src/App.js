import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Container, Row} from "react-bootstrap";
import {PokemonSelector} from "./components/pokemonSelector";
import {ShownPokemonsProvider} from "./contexts/shownPokemonsContext";
import {PokemonList} from "./components/PokemonList";


function ProvidedApp() {
    return <Container fluid className="mt-3 mb-3">
        <h1>My Pokemons</h1>
        <Row> <PokemonSelector/> </Row>
        <Row> <PokemonList/> </Row>
    </Container>;
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
