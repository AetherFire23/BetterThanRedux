import {test} from 'vitest'
import PassedInterface from "../src/feats/TestInterface/PassedInterface";
import {produce} from "immer";

test('Make optionaldefault context', () => {
    const st: PassedInterface = {} as never;
    const nest = produce(st, draft => {
        draft.theNumber = 23
    })
    console.log(nest);
})

