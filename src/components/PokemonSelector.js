import {useEffect, useMemo, useState} from "react";
import {fetchAllPokemon} from "../utilities/fetch";
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";

export function PokemonSelector() {
    const {shownPokemon, addPokemon} = useShownPokemonsContext();
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemonId, setSelectedPokemonId] = useState("");
    const [selectedPokemonName, setSelectedPokemonName] = useState("");
    const enableAddButton = useMemo(() =>
        selectedPokemonId
        && !shownPokemon.some(pokemon => pokemon.id === selectedPokemonId),
        [selectedPokemonId, shownPokemon]
    );

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
        async function fetchAllPokemons() {
            console.log(`useEffect in PokemonSelector: init allPokemons`);
            const fetchedData = await fetchAllPokemon();
            console.log(`useEffect in PokemonSelector: init allPokemons`, {fetchedData});
            setAllPokemons(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    console.log(`PokemonSelector`, {selectedPokemonId});

    return <Container fluid className="p-0">
        <Form className="w-100 bg-white">
            <Row className="m-1">
                <Col xs={3} className="p-1">
                    <Form.Control placeholder="number"
                                  type="number"
                                  value={selectedPokemonId}
                                  onChange={e => {
                                      const pokemonId = parseInt(e.target.value)
                                      setSelectedPokemonId(pokemonId && pokemonId > 0 ? e.target.value : '')

                                  }}/>
                </Col>
                <Col xs={5} sm={6} md={7} className="p-1">
                    <Form.Control placeholder="name" list="pokemon"
                                  value={selectedPokemonName}
                                  onChange={e => setSelectedPokemonName(e.target.value)}/>
                    <datalist id="pokemon">
                        {allPokemons.map(p => <option value={p.name} key={p.id}>{p.name}</option>)}
                    </datalist>
                </Col>
                <Col xs={4} sm={3} md={2} className="p-1">
                    <ButtonGroup className='w-100'>
                        <Button variant="primary"
                                disabled={!enableAddButton}
                                onClick={() => addPokemon(selectedPokemonId)}>Add</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    </Container>;
}

