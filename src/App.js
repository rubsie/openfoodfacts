import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'normalize.css';
import './App.css';
import {PokemonSelector} from "./components/pokemonSelector";
import {ShownPokemonsProvider} from "./contexts/shownPokemonsContext";
import {PokemonList} from "./components/PokemonList";
import {MDBContainer, MDBNavbar, MDBRow} from "mdb-react-ui-kit";
import {StarterMessage} from "./components/starterMessage";


function ProvidedApp() {
    return <>
        <header>
            <MDBNavbar bgColor="white" fixed>
                <PokemonSelector/>
            </MDBNavbar>
        </header>
        <div className="pt-5">
            <MDBContainer fluid className="mt-3 mb-3">
                <MDBRow><h1 className="mt-2">My Pokemons</h1></MDBRow>
                <MDBRow> <PokemonList/> </MDBRow>
                <MDBRow> <StarterMessage/> </MDBRow>
            </MDBContainer>
        </div>
    </>;
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
