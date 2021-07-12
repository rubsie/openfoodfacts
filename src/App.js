import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import {PokemonSelector} from "./components/pokemonSelector";
import {ShownPokemonsProvider} from "./contexts/shownPokemonsContext";
import {PokemonList} from "./components/PokemonList";
import {MDBContainer, MDBRow} from "mdb-react-ui-kit";


function ProvidedApp() {
    return <MDBContainer fluid className="mt-3 mb-3">
        <h1>My Pokemons</h1>
        <MDBRow> <PokemonSelector/> </MDBRow>
        <MDBRow> <PokemonList/> </MDBRow>
    </MDBContainer>;
}

function App() {
    return <ShownPokemonsProvider>
        <ProvidedApp/>
    </ShownPokemonsProvider>;
}

export default App;
