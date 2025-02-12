import {createContext, useState} from 'react';
import {Draft, produce} from "immer";

interface GenericPassedContext<TState> {
    state: TState,
    produceNextState: (writerFn: (writableState: Draft<TState>) => void) => void,
}

// create the context that can be nullable
export function createCoolContext<TState>() {
    const newContext = createContext<GenericPassedContext<TState>>({} as never)
    return newContext
}

export function StrictGenericContexterContextProvider<TState>({children, ctx, defaultValue}:
                                                              {
                                                                  children: React.ReactNode,
                                                                  ctx: React.Context<GenericPassedContext<TState>>,
                                                                  defaultValue?: TState,
                                                              }) {
    // {} === any NON-NULLISH value.
    const initialState: TState = defaultValue === undefined
        ? {} as never // This allows a default value to be passed OR NOT without making typescript suepr mad.
        // Essentially, it will think that tehre is a defualt value, but there is none.
        : defaultValue

    const [state, setState] = useState<TState>(initialState)

    // This is the provided value, it passes down the current state
    const providedValue: GenericPassedContext<TState> = {
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
        <ctx.Provider value={providedValue}>
            {children}
        </ctx.Provider>
    )
}
