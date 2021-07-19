import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {MDBCol} from "mdb-react-ui-kit";

export function StarterMessage() {
    const {shownPokemon} = useShownPokemonsContext();

    if (shownPokemon.length) return null;
    return <MDBCol>
        <div className="p-3 bg-white shadow-4 rounded-3 mt-3">
            Choose a pokemon
        </div>
    </MDBCol>;
}