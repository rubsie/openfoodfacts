import {useEffect, useState} from "react";
import {fetchAllPokemon} from "../utilities/fetch";
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {MDBBtn, MDBBtnGroup, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";

export function PokemonSelector() {
    const {shownPokemonIds, clickedPokemon, addPokemon} = useShownPokemonsContext();
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemonId, setSelectedPokemonId] = useState("");
    const [selectedPokemonName, setSelectedPokemonName] = useState("");
    const selectedPokemonIsInShownList = clickedPokemon && shownPokemonIds.includes(clickedPokemon.id);

    useEffect(() => {
        console.log(`PokemonSelector - name is changed`, {selectedPokemonName});
        const pokemonWithName = allPokemons.find(p => p.name === selectedPokemonName);
        if (pokemonWithName) setSelectedPokemonId(pokemonWithName.id);
    }, [selectedPokemonName, allPokemons]);

    useEffect(() => {
        console.log(`PokemonSelector - id is changed`, {selectedPokemonId});
        const pokemonWithId = allPokemons.find(p => p.id === selectedPokemonId);
        if (pokemonWithId) setSelectedPokemonName(pokemonWithId.name);
    }, [selectedPokemonId, allPokemons]);

    useEffect(() => {
        console.log(`useEffect in PokemonSelector: clickedPokemon.id is now ${clickedPokemon && clickedPokemon.id}`);
        if (!clickedPokemon) return;
        const pokemonWithId = allPokemons.find(p => p.id === clickedPokemon.id);
        if (pokemonWithId) setSelectedPokemonName(pokemonWithId.name);
    }, [clickedPokemon, allPokemons, setSelectedPokemonId]);

    useEffect(() => {
        async function fetchAllPokemons() {
            console.log(`useEffect in PokemonSelector: init allPokemons`);
            const fetchedData = await fetchAllPokemon();
            console.log(`useEffect in PokemonSelector: init allPokemons`, {fetchedData});
            setAllPokemons(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    console.log(`PokemonSelector`, {selectedPokemonId});

    return <MDBContainer fluid className="p-0">
        <MDBRow className="w-100 m-0">
            <MDBCol size={3}>
                <MDBInput label="number" type="number"
                    value={selectedPokemonId}
                    onChange={e => {
                        const pokemonId = parseInt(e.target.value)
                        setSelectedPokemonId(pokemonId > 0 ? pokemonId : 0)

                    }} />
            </MDBCol>
            <MDBCol size={5} sm={6} md={7}>
                <MDBInput label="name" list="pokemon"
                    value={selectedPokemonName}
                    className="form-select"
                    onChange={e => setSelectedPokemonName(e.target.value)} />
                <datalist id="pokemon">
                    {allPokemons.map(p => <option value={p.name} key={p.id}>{p.name}</option>)}
                </datalist>
            </MDBCol>
            <MDBCol size={4} sm={3} md={2}>
                <MDBBtnGroup className='w-100'>
                    <MDBBtn variant="outline-primary"
                        disabled={!!selectedPokemonIsInShownList}
                        onClick={() => addPokemon(selectedPokemonId)}>Add</MDBBtn>
                </MDBBtnGroup>
            </MDBCol>
        </MDBRow>
    </MDBContainer>;
}

