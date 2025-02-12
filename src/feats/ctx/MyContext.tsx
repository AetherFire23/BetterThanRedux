import {createContext, useState} from 'react';


interface State {
    someNum: number,
}

interface PassedContext {
    state: State,
    setState: (state: State) => void
}

// The value of the Context must be matching exactly the value of the value that will be passed down the tree.
export const LevelContext = createContext<PassedContext>({state: {someNum: 0}, setState: () => {}});

export function LevelContextProvider({children}:
                                         {
                                             children: React.ReactNode
                                         }) {

    const [state, setState] = useState<State>({someNum: 23})

    const passed: PassedContext = {
        setState: (s) => setState(s),
        state: state,
    }

    return (
        <LevelContext.Provider value={passed}>
            {children}
        </LevelContext.Provider>
    )
}