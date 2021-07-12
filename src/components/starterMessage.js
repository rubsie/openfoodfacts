import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {MDBCol} from "mdb-react-ui-kit";

export function StarterMessage() {
    const {shownPokemonIds} = useShownPokemonsContext();

    if (shownPokemonIds.length) return null;
    return <MDBCol>
        <div className="p-3 bg-white shadow-4 rounded-3 mt-3">
            Choose a pokemon
        </div>
    </MDBCol>;
}