import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {fromLocalStorage, toLocalStorage} from "../utilities/localStorage";
import {fetchOnePokemon} from "../utilities/fetch";


const ShownPokemonsContext = createContext();

export function ShownPokemonsProvider(props) {
    const [shownPokemon, setShownPokemon] = useState([]);

    console.log({shownPokemon});

    useEffect(() => {
        async function hydrate() {
            const ids = fromLocalStorage()
            const pokemon = await Promise.all(ids.map(id => fetchOnePokemon(id)))
            setShownPokemon(pokemon)
        }

        hydrate()
    }, [setShownPokemon])

    useEffect(() => {
        toLocalStorage(shownPokemon.map(pokemon => pokemon.id));
    }, [shownPokemon]);

    const addPokemon = useCallback(async id => {
        console.log(`add ${id}`);
        if (!shownPokemon.some(pokemon => pokemon.id === id)) {
            const pokemon = await fetchOnePokemon(id)
            setShownPokemon(shownPokemon => [...shownPokemon, pokemon].sort((a, b) => Number(a) - Number(b)));
        }
    }, [shownPokemon, setShownPokemon]);

    const removePokemon = useCallback(id => {
        console.log(`remove ${id}`);
        if (shownPokemon.some(pokemon => pokemon.id === id))
            setShownPokemon(shownPokemon => shownPokemon.filter(pokemon => pokemon.id !== id));

    }, [shownPokemon, setShownPokemon]);

    const findPokemon = useCallback(id => {
        return shownPokemon.find(p => p.id === id);
    }, [shownPokemon]);

    const api = useMemo(
        () => ({
            shownPokemon,
            findPokemon,
            addPokemon,
            removePokemon
        }),
        [
            shownPokemon,
            findPokemon,
            addPokemon,
            removePokemon
        ]
    );

    return <ShownPokemonsContext.Provider value={api}>
        {props.children}
    </ShownPokemonsContext.Provider>
}


export const useShownPokemonsContext = () => useContext(ShownPokemonsContext);