import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import './App.css';
import {PokemonSelector} from "./components/PokemonSelector";
import {ShownPokemonsProvider} from "./contexts/shownPokemonsContext";
import {PokemonList} from "./components/PokemonList";
import {StarterMessage} from "./components/StarterMessage";
import {Container, Navbar, Row} from "react-bootstrap";


function ProvidedApp() {
    return <>
        <header>
            <Navbar fixed="top" className="p-0 shadow-sm">
                <PokemonSelector/>
            </Navbar>
        </header>
        <div className="pt-5">
            <Container fluid className="mt-3 mb-3">
                <Row><h1 className="mt-2">My Pokemons</h1></Row>
                <Row><PokemonList/></Row>
                <Row><StarterMessage/></Row>
            </Container>
        </div>
    </>;
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
