import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useCallback, useEffect, useState} from "react";
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


function PokemonCompleteList(props) {
    const {selectedPokemonId, addPokemon, removePokemon} = props;
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();

    const findPokemonWithId = useCallback((id) => {
        const pokemon = allPokemons.find(p => p.id === id);
        console.log({allPokemons});
        console.log({pokemon});
        return pokemon;
    }, [allPokemons]);

    const findPokemonWithName = useCallback((name) => {
        return allPokemons.find(p => p.name === name);
    }, [allPokemons])

    useEffect(() => {
        console.log(`useEffect in PokemonCompleteList ${selectedPokemonId}`);
        setSelectedPokemon(findPokemonWithId(selectedPokemonId));
    }, [selectedPokemonId, findPokemonWithId]);

    useEffect(() => {
        async function fetchAllPokemons() {
            const fetchedData = await fetchAllPokemon();
            console.log({fetchedData});
            setAllPokemons(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    console.log(`PokemonSelector ${selectedPokemon}`);
    console.log({allPokemonIds: allPokemons});

    return <Col>
        <Form className="p-3 bg-white">
            <Row className="d-flex align-items-end">
                <Col xs={3}>
                    <Form.Label>number: </Form.Label>
                    <Form.Control value={selectedPokemon && selectedPokemon.id} type="number"
                                  onChange={e => setSelectedPokemon(findPokemonWithId(e.target.value))}/>
                </Col>
                <Col xs={6}>
                    <Form.Label>name: </Form.Label>
                    <Form.Control value={selectedPokemon && selectedPokemon.name} list="pokemon" className="form-select"
                                  onChange={e => setSelectedPokemon(findPokemonWithName(e.target.value))}/>
                    <datalist id="pokemon">
                        {allPokemons.map(p => <option value={p.name} key={p.id}>{p.name}</option>)}
                    </datalist>
                </Col>
                <Col xs={2}>
                    <ButtonGroup>
                        <Button variant="outline-primary"
                                onClick={() => removePokemon(selectedPokemon && selectedPokemon.id)}>-</Button>
                        <Button variant="outline-primary"
                                onClick={() => addPokemon(selectedPokemon && selectedPokemon.id)}>+</Button>
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
        id: String(data.id),
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
                    <PokemonCompleteList
                        selectedPokemonId={clickedPokemon && clickedPokemon.id}
                        addPokemon={addPokemon}
                        removePokemon={removePokemon}/>
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
