import {Card, Col} from "react-bootstrap";

export function PokemonCard(props) {
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