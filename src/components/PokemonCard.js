import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {Button, Card, Col} from "react-bootstrap";

export function PokemonCard(props) {
    const {pokemon} = props;
    const {removePokemon} = useShownPokemonsContext();

    if (!pokemon) return null;
    return <Col xs={6} sm={4} md={3} xl={2} className="mt-3">
        <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-1 mb-3">
                <Card.Title>{pokemon.id}. {pokemon.name}</Card.Title>
                <Card.Text>Type: {pokemon.types}</Card.Text>
                <Card.Img
                    src={pokemon.image}
                    alt={pokemon.name}
                    variant="bottom"
                    className="p-0 p-sm-2 p-md-2 w-100 h-auto"/>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
                <Button variant="primary"
                        className='w-100'
                        onClick={() => removePokemon(pokemon.id)}>Remove</Button>
            </Card.Footer>
        </Card>
    </Col>
}