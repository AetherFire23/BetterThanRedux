import {createContext, useState} from 'react';
import {produce, WritableDraft} from "immer";

interface State {
    someNum: number,
}

interface PassedContext {
    state: State,
    // createNextState: (state: WritableDraft<State>) => State
    produceNextState: (writerFn: (writableState: WritableDraft<State>) => void) => void,
}

const def: PassedContext = {
    produceNextState: (s) => {
        console.log(s);
    },
    state: {
        someNum: 0,
    }
}

// The value of the Context must be matching exactly the value of the value that will be passed down the tree.
export const ImmerContext = createContext<PassedContext>(def);

export function ImmerContextProvider({children}:
                                         {
                                             children: React.ReactNode
                                         }) {

    const [state, setState] = useState<State>({someNum: 23})

    const passed: PassedContext = {
        // When called, its gonna ask for the writableDraft callback
        produceNextState: (writerFn) => {
            const nextState = produce(state, draft => {
                writerFn(draft)
            })
            console.log("runnin!")

            setState(nextState)
        },
        state: state,
    }

    return (
        <ImmerContext.Provider value={passed}>
            {children}
        </ImmerContext.Provider>
    )
}