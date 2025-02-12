import {createContext, useContext, useState} from 'react';
import {Draft, produce} from "immer";

// interface State {
//     someNum: number,
// }
//
// interface PassedContext {
//     state: State,
//     // createNextState: (state: WritableDraft<State>) => State
//     produceNextState: (writerFn: (writableState: WritableDraft<State>) => void) => void,
// }
// The value of the Context must be matching exactly the value of the value that will be passed down the tree.
// Need a function to create the ctx
// export const GenericContexter = createContext<PassedContext | null>(null);

interface GenericPassedContext<TState> {
    state: TState,
    produceNextState: (writerFn: (writableState: Draft<TState>) => void) => void,
}

// create the context that can be nullable
export function createCoolContext<TState>() {
    const newContext = createContext<GenericPassedContext<TState>>({} as never)

    return newContext
}

// but always useContext using the strict one
export function useStrictContext<T>(pCtx: React.Context<T>) {
    const ctx = useContext(pCtx)

    if (ctx === null) {
        throw new Error("dude why...")
    }

    return ctx
}

// {} === any NON-NULLISH value.
export function StrictGenericContexterContextProvider<TState>({children, ctx, defaultValue}:
                                                              {
                                                                  children: React.ReactNode,
                                                                  ctx: React.Context<GenericPassedContext<TState>>,
                                                                  defaultValue?: TState,
                                                              }) {

    const initialState: TState = defaultValue === undefined
        ? {} as never
        : defaultValue

    const [state, setState] = useState<TState>(initialState)

    const passed: GenericPassedContext<TState> = {
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
        <ctx.Provider value={passed}>
            {children}
        </ctx.Provider>
    )
}

