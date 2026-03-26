# Not really

It's a joke, it's not really better than redux, but it's probably better than react's default useState!!!

React's default useState() is terrible, especially when Immer exists. 
Basically is this project is a wrapper over context + immer + usestate. It's terrible and business logic (reducers) should be written in ts-files.  However at least it enables this syntax :  

```
    function handleButtonClick() {
        ctx.produceNextState(d => {
            console.log("runnin!")
            d.thaNumba += 1;
        })
    }
```
