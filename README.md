# Not really

It's a joke, it's not really better than redux, but it's probably better than react's default useState!!!

React's default useState() is terrible, especially when Immer exists. 
Basically is this project is a wrapper over context + immer + usestate. It's terrible and business logic (reducers) should be written in .ts.  However at least it enables this syntax :  

```
    function handleButtonClick() {
        ctx.produceNextState(d => {
            d.thaNumba += 1;
        })
    }
```


Basically context is injected, avoiding prop drilling, it's using Immer to make observable updates to the state (including collections) therefore the syntax can be much more concise than react's default usetate for complex objects and collections, and it avoids some of the ceremony of plugging redux inside a project ( but use Redux plz)
