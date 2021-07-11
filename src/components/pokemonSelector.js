import {useCallback, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {fetchAllPokemon} from "../utilities/fetch";
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";

export function PokemonSelector(props) {
    const {selectedPokemonId} = props;
    const {shownPokemonIds, addPokemon, removePokemon} = useShownPokemonsContext();
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState();
    const selectedPokemonIsInShownList = selectedPokemon && shownPokemonIds.find(id => id === selectedPokemon.id);

    const findPokemonWithId = useCallback((id) => {
        const pokemon = allPokemons.find(p => p.id === id);
        console.log({allPokemons});
        console.log({pokemon});
        return pokemon;
    }, [allPokemons]);

    const findPokemonWithName = useCallback((name) => {
        return allPokemons.find(p => p.name === name);
    }, [allPokemons])

    useEffect(() => {
        console.log(`useEffect in PokemonCompleteList ${selectedPokemonId}`);
        setSelectedPokemon(findPokemonWithId(selectedPokemonId));
    }, [selectedPokemonId, findPokemonWithId]);

    useEffect(() => {
        async function fetchAllPokemons() {
            const fetchedData = await fetchAllPokemon();
            console.log({fetchedData});
            setAllPokemons(fetchedData);
        }

        fetchAllPokemons();
    }, []);

    console.log(`PokemonSelector ${selectedPokemon}`);
    console.log({allPokemonIds: allPokemons});

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

