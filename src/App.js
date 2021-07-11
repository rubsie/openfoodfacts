import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useState} from "react";
import {Container, Row} from "react-bootstrap";
import {ListAllPokemons} from "./components/listAllPokemons";
import {Pokemon} from "./components/pokemon";
import {ShownPokemonsProvider, useShownPokemonsContext} from "./contexts/shownPokemonsContext";


function ProvidedApp() {
    const {shownPokemonIds, shownPokemonsData} = useShownPokemonsContext();
    const [clickedPokemon, setClickedPokemon] = useState();

    return (<div>
            <Container fluid className="mt-3 mb-3">
                <h1>My Pokemons</h1>
                <Row>
                    <ListAllPokemons selectedPokemonId={clickedPokemon && clickedPokemon.id}/>
                </Row>
                <Row>
                    {shownPokemonIds.map(id => {
                        const pokemon = shownPokemonsData.find(p => p.id === id);
                        return <Pokemon key={id} pokemon={pokemon}
                                        setSelectedPokemon={() => setClickedPokemon(pokemon)}/>
                    })}
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
