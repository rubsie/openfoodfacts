import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {fromLocalStorage} from "../utilities/localStorage";


const ShownPokemonsContext = createContext();

export function ShownPokemonsProvider(props) {
    const [shownPokemonIds, setShownPokemonIds] = useState(() => fromLocalStorage());

    const api = useMemo(() => ({shownPokemonIds, setShownPokemonIds}),
        [shownPokemonIds, setShownPokemonIds]);

    return <ShownPokemonsContext.Provider value={api}>
        {props.children}
    </ShownPokemonsContext.Provider>
}


export const useShownPokemonsContext = () => useContext(ShownPokemonsContext);