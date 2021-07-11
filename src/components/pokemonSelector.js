import {useCallback, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {fetchAllPokemon} from "../utilities/fetch";
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";

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

    return <Col>
        <Form className="p-3 bg-white">
            <Row className="d-flex align-items-end">
                <Col xs={3}>
                    <Form.Label>number: </Form.Label>
                    <Form.Control value={selectedPokemon && selectedPokemon.id} type="number"
                                  onChange={e => setSelectedPokemon(findPokemonWithId(e.target.value))}/>
                </Col>
                <Col xs={6}>
                    <Form.Label>name: </Form.Label>
                    <Form.Control value={selectedPokemon && selectedPokemon.name} list="pokemon" className="form-select"
                                  onChange={e => setSelectedPokemon(findPokemonWithName(e.target.value))}/>
                    <datalist id="pokemon">
                        {allPokemons.map(p => <option value={p.name} key={p.id}>{p.name}</option>)}
                    </datalist>
                </Col>
                <Col xs={2}>
                    <ButtonGroup>
                        <Button variant="outline-primary"
                                disabled={!selectedPokemonIsInShownList}
                                onClick={() => removePokemon(selectedPokemon && selectedPokemon.id)}>-</Button>

                        <Button variant="outline-primary"
                                disabled={!!selectedPokemonIsInShownList}
                                onClick={() => addPokemon(selectedPokemon && selectedPokemon.id)}>+</Button>

                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    </Col>;
}

