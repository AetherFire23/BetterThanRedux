import {LevelContext, LevelContextProvider} from "./feats/ctx/MyContext.tsx";
import {useContext} from "react";

function App() {

    return (
        <>
            <LevelContextProvider>
                <CompUsingContext/>
            </LevelContextProvider>
        </>
    )
}

function CompUsingContext() {
    const ctx = useContext(LevelContext)

    function handleButtonClick() {
        ctx.setState({someNum: ctx.state.someNum +1})
    }

    return (
        <div>
            <div> {ctx.state.someNum} </div>
            <button onClick={handleButtonClick}> add one</button>
        </div>
    )
}

export default App
