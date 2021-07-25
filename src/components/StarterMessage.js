import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {Col} from "react-bootstrap";

export function StarterMessage() {
    const {shownPokemon} = useShownPokemonsContext();

    if (shownPokemon.length) return null;
    return <Col>
        <div className="p-3 bg-white shadow-4 rounded-3 mt-3">
            Choose a pokemon
        </div>
    </Col>;
}