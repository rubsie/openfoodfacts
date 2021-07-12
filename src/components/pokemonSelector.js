import {useCallback, useEffect, useState} from "react";
import {fetchAllPokemon} from "../utilities/fetch";
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {MDBBtn, MDBBtnGroup, MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";

export function PokemonSelector() {
    const {shownPokemonIds, clickedPokemon, addPokemon, removePokemon} = useShownPokemonsContext();
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();
    const selectedPokemonIsInShownList = clickedPokemon && shownPokemonIds.includes(clickedPokemon.id);

    const findPokemonWithId = useCallback((id) => {
        return allPokemons.find(p => p.id === id);
    }, [allPokemons]);

    const findPokemonWithName = useCallback((name) => {
        return allPokemons.find(p => p.name === name);
    }, [allPokemons])

    useEffect(() => {
        console.log(`useEffect in PokemonSelector: clickedPokemon.id is now ${clickedPokemon && clickedPokemon.id}`);
        setSelectedPokemon(findPokemonWithId(clickedPokemon && clickedPokemon.id));
    }, [clickedPokemon, findPokemonWithId]);

    useEffect(() => {
        async function fetchAllPokemons() {
            console.log(`useEffect in PokemonSelector: init allPokemons`);
            const fetchedData = await fetchAllPokemon();
            console.log(`useEffect in PokemonSelector: init allPokemons`, {fetchedData});
            setAllPokemons(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    console.log(`PokemonSelector`, {selectedPokemon});
    console.log({allPokemons});

    return <MDBCol>
        <div className="p-3 bg-white shadow-4 rounded-3">
            <MDBRow className="d-flex align-items-end">
                <MDBCol size={3}>
                    <MDBInput label="number" type="number"
                              value={selectedPokemon && selectedPokemon.id}
                              onChange={e => setSelectedPokemon(findPokemonWithId(e.target.value))}/>
                </MDBCol>
                <MDBCol size={6}>
                    <MDBInput label="name" list="pokemon"
                              value={selectedPokemon && selectedPokemon.name}
                              className="form-select"
                              onChange={e => setSelectedPokemon(findPokemonWithName(e.target.value))}/>
                    <datalist id="pokemon">
                        {allPokemons.map(p => <option value={p.name} key={p.id}>{p.name}</option>)}
                    </datalist>
                </MDBCol>
                <MDBCol size={2}>
                    <MDBBtnGroup>
                        <MDBBtn variant="outline-primary"
                                disabled={!selectedPokemonIsInShownList}
                                onClick={() => removePokemon(selectedPokemon && selectedPokemon.id)}>-</MDBBtn>

                        <MDBBtn variant="outline-primary"
                                disabled={!!selectedPokemonIsInShownList}
                                onClick={() => addPokemon(selectedPokemon && selectedPokemon.id)}>+</MDBBtn>

                    </MDBBtnGroup>
                </MDBCol>
            </MDBRow>
        </div>
    </MDBCol>;
}

