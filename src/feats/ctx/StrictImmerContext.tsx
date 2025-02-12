import {createContext, useContext, useState} from 'react';
import {produce, WritableDraft} from "immer";

interface State {
    someNum: number,
}

interface PassedContext {
    state: State,
    // createNextState: (state: WritableDraft<State>) => State
    produceNextState: (writerFn: (writableState: WritableDraft<State>) => void) => void,
}

// The value of the Context must be matching exactly the value of the value that will be passed down the tree.
export const StrictImmerContext = createContext<PassedContext | null>(null);

export function StrictImmerContextProvider({children}:
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
        <StrictImmerContext.Provider value={passed}>
            {children}
        </StrictImmerContext.Provider>
    )
}

export function useStrictImmerContext() {
    const ctx = useContext(StrictImmerContext)

    if (ctx === null) {
        throw new Error("dude why...")
    }

    return ctx
}