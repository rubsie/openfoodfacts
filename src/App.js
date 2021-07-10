import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useEffect, useState} from "react";
import {Button, ButtonGroup, Card, CardGroup, Col, Container, Form, Row} from "react-bootstrap";

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
    const {addPokemon, removePokemon} = props;
    const [id, setId] = useState("");

    console.log(`PokemonSelector ${id}`);
    return <Col>
        <Form className="p-3 bg-white">
            <Form.Group controlId="id">
                <Form.Label>number: </Form.Label>
                <Form.Control value={id} type="number"
                              onChange={e => setId(e.target.value)}/>
            </Form.Group>
            <ButtonGroup>
                <Button variant="outline-primary" onClick={() => removePokemon(id)}>-</Button>
                <Button variant="outline-primary" onClick={() => addPokemon(id)}>+</Button>
            </ButtonGroup>
        </Form>
    </Col>;
}

async function fetchOnePokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`fetch ${id} done`)
    const data = await response.json();
    console.log(`fetch ${id} data `, data.id)
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        types: data.types.map(t => t.type.name).join(", ")
    };
}

function App() {
    const [shownPokemonIds, setShownPokemonIds] = useState([202, 203, 205, 206, 207, 208, 209, 210]);
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();

    useEffect(() => {
        async function fetchPokemon() {
            const fetchedData = await Promise.all(shownPokemonIds.map(id => fetchOnePokemon(id)));
            console.log({promises: fetchedData});
            setPokemons(fetchedData);
        }
        fetchPokemon();
    }, [shownPokemonIds]);

    function addPokemon(id) {
        console.log(`add ${id}`);
        const idNumber = Number(id);
        if (!shownPokemonIds.includes(idNumber)) setShownPokemonIds([...shownPokemonIds, idNumber].sort((a, b) => a - b));
    }

    function removePokemon(id) {
        console.log(`remove ${id}`);
        const idNumber = Number(id);
        if (shownPokemonIds.includes(idNumber)) setShownPokemonIds(shownPokemonIds.filter(i => i !== idNumber));
    }

    console.log({pokemonIds: shownPokemonIds});
    console.log({pokemons});
    if (!pokemons) return null;
    return (<div>
            <Container fluid className="mt-3 mb-3">
                <h1>My Pokemons</h1>
                <Row><PokemonSelector selectedPokemon={selectedPokemon}
                                      addPokemon={addPokemon}
                                      removePokemon={removePokemon}/></Row>
                <Row><CardGroup>
                    {pokemons.map(p => <Pokemon key={p.id} pokemon={p}
                                                setSelectedPokemon={() => setSelectedPokemon(p)}/>)}
                </CardGroup></Row>
            </Container></div>
    );
}

export default App;
