import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useEffect, useState} from "react";
import {Card, CardGroup, Col, Container} from "react-bootstrap";

function Pokemon(props) {
    const {pokemon} = props;

    if (!pokemon) return null;
    return <Col sm={6} md={3} className="mt-3">
        <Card className="h-100">
            <Card.Body className="text-center p-1 mb-3">
                <Card.Title>{pokemon.id}. {pokemon.name}</Card.Title>
                <Card.Text>Type: {pokemon.types}</Card.Text>
            </Card.Body>
            <Card.Img src={pokemon.image} alt={pokemon.name} variant="bottom" className="p-5 p-sm-2 p-md-2"/>
        </Card>
    </Col>
}

const pokemonIds = [202, 203, 205, 206, 207, 208, 209, 210];

function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchPokemon() {
            const fetchedData = await Promise.all(
                pokemonIds.map(async id => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    console.log(`fetch ${id} done`)
                    const data = await response.json();
                    console.log(`fetch ${id} data `, data.id)
                    return data;
                }));
            console.log({promises: fetchedData});
            const fetchedPokemons = fetchedData.map(data => ({
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                types: data.types.map(t => t.type.name).join(", ")
            }))
            setPokemons(fetchedPokemons);
        }
        fetchPokemon();
    }, []);

    console.log({pokemons});
    if (!pokemons) return null;
    return (
        <Container fluid className="mt-3">
            <CardGroup>
                {pokemons.map(p => <Pokemon key={p.id} pokemon={p}/>)}
            </CardGroup>
        </Container>
    );
}

export default App;
