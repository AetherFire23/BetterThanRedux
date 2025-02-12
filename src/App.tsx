import {createCoolContext, StrictGenericContexterContextProvider} from "./feats/ctx/BetterThanRedux.tsx";
import {useContext} from "react";

interface MyNumberState {
    thaNumba: number,
}

const myCtx = createCoolContext<MyNumberState>()

function App() {
    return (
        <>
            <StrictGenericContexterContextProvider ctx={myCtx} defaultValue={{thaNumba: 0}}>
                <GenericContexterComp/>
            </StrictGenericContexterContextProvider>
        </>
    )
}

function GenericContexterComp() {
    const ctx = useContext(myCtx)
    console.log(ctx);

    function handleButtonClick() {
        ctx.produceNextState(d => {
            console.log("runnin!")
            d.thaNumba += 1;
        })
    }

    return (
        <div>
            <div> {ctx.state.thaNumba} </div>
            <button onClick={handleButtonClick}> add one</button>
        </div>
    )
}

export default App


