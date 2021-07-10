import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useEffect, useState} from "react";
import {Card, CardDeck, CardGroup, Container} from "react-bootstrap";

function Pokemon(props) {
    const {pokemon} = props;

    if (!pokemon) return null;
    return <Card>
        <Card.Img src={pokemon.image} alt={pokemon.name}/>
        <Card.Body className="text-center p-3">
            <Card.Title>{pokemon.id}. {pokemon.name}</Card.Title>
            <Card.Text>Type: {pokemon.types}</Card.Text>
        </Card.Body>
    </Card>
}

function App() {
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/202`);
            const data = await response.json();
            setPokemon({
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                types: data.types.map(t => t.type.name).join(", ")
            });
        };
        fetchPokemon();
    }, []);

    console.log({pokemon});

    return (
        <Container fluid className="mt-3">
            <CardDeck>
                <Pokemon pokemon={pokemon}/>
                <Pokemon pokemon={pokemon}/>
                <Pokemon pokemon={pokemon}/>
            </CardDeck>
        </Container>
    );
}

export default App;
