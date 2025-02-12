import {
    createCoolContext,
    StrictGenericContexterContextProvider,
    useStrictContext
} from "./feats/ctx/GenericContexter.tsx";

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

// function CompUsingContext() {
//     const ctx = useContext(LevelContext)
//
//     function handleButtonClick() {
//         ctx.setState({someNum: ctx.state.someNum + 1})
//     }
//
//     return (
//         <div>
//             <div> {ctx.state.someNum} </div>
//             <button onClick={handleButtonClick}> add one</button>
//         </div>
//     )
// }

// function ComponentCallingImmerContext() {
//     const ctx = useContext(ImmerContext)
//     console.log(ctx);
//
//     function handleButtonClick() {
//
//         ctx.produceNextState(d => {
//             console.log("runnin!")
//             d.someNum += 1
//         })
//     }
//
//     return (
//         <div>
//             <div> {ctx.state.someNum} </div>
//             <button onClick={handleButtonClick}> add one</button>
//         </div>
//     )
// }

// function StrictImmerContextComp() {
//     const ctx = useStrictImmerContext()
//     console.log(ctx);
//
//     function handleButtonClick() {
//
//         ctx.produceNextState(d => {
//             console.log("runnin!")
//             d.someNum += 1
//         })
//     }
//
//     return (
//         <div>
//             <div> {ctx.state.someNum} </div>
//             <button onClick={handleButtonClick}> add one</button>
//         </div>
//     )
// }

function GenericContexterComp() {
    const ctx = useStrictContext(myCtx)
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


