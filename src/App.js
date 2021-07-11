import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useEffect, useState} from "react";
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";

function Pokemon(props) {
    const {pokemon, setSelectedPokemon} = props;

    if (!pokemon) return null;
    return <Col sm={6} md={3} className="mt-3" onClick={setSelectedPokemon}>
        <Card className="h-100">
            <Card.Body className="text-center p-1 mb-3">
                <Card.Title>{pokemon.id}. {pokemon.name}</Card.Title>
                <Card.Text>Type: {pokemon.types}</Card.Text>
            </Card.Body>
            <Card.Img src={pokemon.image} alt={pokemon.name} variant="bottom" className="p-5 p-sm-2 p-md-2"/>
        </Card>
    </Col>
}


function PokemonSelector(props) {
    const {allPokemonIds, addPokemon, removePokemon} = props;
    const [id, setId] = useState("");

    console.log(`PokemonSelector ${id}`);
    return <Col>
        <Form className="p-3 bg-white">
            <Row className="d-flex align-items-end">
                <Col xs={4}>
                    <Form.Label>pokemon number: </Form.Label>
                    <Form.Control value={id} type="number"
                                  onChange={e => setId(e.target.value)}/>
                </Col>
                <Col xs={5}>
                    <Form.Label>pokemon name: </Form.Label>
                    <Form.Control value={id} list="pokemon" className="form-select"
                                  onChange={e => setId(e.target.value)}/>
                    <datalist id="pokemon">
                        {allPokemonIds.map(p => <option value={p.id}>{p.name}</option>)}
                    </datalist>
                </Col>
                <Col xs={2} >
                    <ButtonGroup>
                        <Button variant="outline-primary" onClick={() => removePokemon(id)}>-</Button>
                        <Button variant="outline-primary" onClick={() => addPokemon(id)}>+</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    </Col>;
}

async function fetchOnePokemon(id) {
    console.log(`---fetch ${id} `)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`---fetch ${id} done`)
    const data = await response.json();
    console.log(`---fetch ${id} data `, data.id)
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        types: data.types.map(t => t.type.name).join(", ")
    };
}


function getIdFromUrl(url) {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];

}

async function fetchAllPokemon() {
    console.log(`---fetch all `)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=-1`);
    console.log(`---fetch all done`)
    const data = await response.json();
    console.log(`---fetch all data `, {data})
    return data.results.map(p => ({id: getIdFromUrl(p.url), name: p.name}));
}

function fromLocalStorage() {
    return JSON.parse(localStorage.getItem("pokemonIds")) || [];
}

function toLocalStorage(shownPokemonIds) {
    localStorage.setItem("pokemonIds", JSON.stringify(shownPokemonIds));
}

function App() {

    const [allPokemonIds, setAllPokemonIds] = useState([]);
    const [shownPokemonIds, setShownPokemonIds] = useState(() => fromLocalStorage());
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();

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

    useEffect(() => {
        async function fetchAllPokemons() {
            const fetchedData = await fetchAllPokemon();
            console.log({fetchedData});
            setAllPokemonIds(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    function addPokemon(id) {
        console.log(`add ${id}`);
        const idNumber = Number(id);
        if (!shownPokemonIds.includes(idNumber))
            setShownPokemonIds([...shownPokemonIds, idNumber].sort((a, b) => a - b));
    }

    function removePokemon(id) {
        console.log(`remove ${id}`);
        const idNumber = Number(id);
        if (shownPokemonIds.includes(idNumber))
            setShownPokemonIds(shownPokemonIds.filter(i => i !== idNumber));
    }

    console.log({allPokemonIds});
    console.log({shownPokemonIds});
    console.log({pokemons});
    if (!pokemons) return null;
    return (<div>
            <Container fluid className="mt-3 mb-3">
                <h1>My Pokemons</h1>
                <Row><PokemonSelector selectedPokemon={selectedPokemon}
                                      allPokemonIds={allPokemonIds}
                                      addPokemon={addPokemon}
                                      removePokemon={removePokemon}/></Row>
                <Row>
                    {shownPokemonIds.map(id => {
                        const pokemon = pokemons.find(p => p.id === id);
                        return <Pokemon key={id} pokemon={pokemon}
                                        setSelectedPokemon={() => setSelectedPokemon(pokemon)}/>
                    })}
                </Row>
            </Container></div>
    );
}

export default App;
