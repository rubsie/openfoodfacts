import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {fromLocalStorage, toLocalStorage} from "../utilities/localStorage";
import {fetchOnePokemon} from "../utilities/fetch";


const ShownPokemonsContext = createContext();

export function ShownPokemonsProvider(props) {
    const [shownPokemonIds, setShownPokemonIds] = useState(() => fromLocalStorage());
    const [shownPokemonsData, setShownPokemonsData] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState();

    console.log({shownPokemonIds});
    console.log({shownPokemonsData});

    useEffect(() => {
        async function fetchShownPokemons() {
            const idsToFetch = shownPokemonIds.filter(id => !shownPokemonsData.find(p => p.id === id));
            if (!idsToFetch.length) {
                console.log(`fetchShownPokemons nothing to fetch`);
                toLocalStorage(shownPokemonIds);
                return;
            }
            try {
                console.log(`fetchShownPokemons `, {idsToFetch});
                const fetchedData = await Promise.all(idsToFetch.map(id => fetchOnePokemon(id)));
                console.log({fetchedData});
                setShownPokemonsData([...shownPokemonsData, ...fetchedData]);
                toLocalStorage(shownPokemonIds); // do not update in case of an exception
            } catch (e) {
                console.log(`fetchShownPokemons exception: restore shownPokemonIds from localStorage`);
                setShownPokemonIds(fromLocalStorage());
            }
        }

        fetchShownPokemons();
    }, [shownPokemonIds, shownPokemonsData]);

    const addPokemon = useCallback(id => {
        console.log(`add ${id}`);
        if (!shownPokemonIds.includes(id))
            setShownPokemonIds([...shownPokemonIds, id].sort((a, b) => Number(a) - Number(b)));
    }, [shownPokemonIds, setShownPokemonIds]);

    const removePokemon = useCallback(id => {
        console.log(`remove ${id}`);
        if (shownPokemonIds.includes(id))
            setShownPokemonIds(shownPokemonIds.filter(i => i !== id));
    }, [shownPokemonIds, setShownPokemonIds]);

    const getPokemonDataWithId = useCallback(id => {
        return shownPokemonsData.find(p => p.id === id);
    }, [shownPokemonsData]);

    const api = useMemo(() => ({
            shownPokemonIds, setShownPokemonIds,
            shownPokemonsData, setShownPokemonsData,
            clickedPokemon, setClickedPokemon,
            getPokemonDataWithId,
            addPokemon,
            removePokemon
        }),
        [shownPokemonIds, setShownPokemonIds, shownPokemonsData, setShownPokemonsData, clickedPokemon, setClickedPokemon, getPokemonDataWithId, addPokemon, removePokemon]);

    return <ShownPokemonsContext.Provider value={api}>
        {props.children}
    </ShownPokemonsContext.Provider>
}


export const useShownPokemonsContext = () => useContext(ShownPokemonsContext);