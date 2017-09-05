# react-mobx-mobxstatetree
## What This Repo Should Be
A simple application created in React with Mobx and Mobx-State-Tree for learning purpose.

## Installing This Repo
Simply download and extract this repo and execute these commands in the terminal.
```
npm install
npm start
```
Use `npm test` to tests the code using Karma and Jasmine.

## Opening an Issue
Feel free to open an issue to give a feedback, critique, idea, advice, or anything for the author.

## App Notes
### Mobx-React
*1. Injection*

Use `Provider` and `inject` to inject a `props`' property to a react component without the need of passing that `props`' property to the parent components.

### Mobx-State-Tree
*1. Using interface from Mobx-State-Tree model*

Take `modelA` which is an mobx-state-tree model for example.
```
const ModelA = types.model("ModelA", {
    id: types.number
});
```
Code below shows how to get this `modelA` interface.
```
type IModelA = typeof ModelA.Type;
```

*2. Push a model to an array*

One way to push a model to an array is using the model interface.
```
const ModelA = types.model("ModelA", {
    id: types.number
});

type IModelA = typeof ModelA.Type;

const ArrModelA = types.model("ArrModelA", {
    values: types.array(ModelA)
}).action((self) => ({
    add(id: number) {
        self.values.push({
            id: id
        } as IModelA);
    }
}));
```

*3. Handling model update on async action*

When an action is async and its callback function update the model (example code shown below), a `Cannot modify '{the model}', the object is protected and can only be modified by using an action` error will be thrown.
```
const someModel = types.model("someModel", {
    name: types.string
}).action((self) => ({
    changeNameAsync() {
        someAsyncMethod().then(name => {
            self.name = name; // Error will be thrown because of this statement;
        });
    }
}));
```
This problem can be solved by using another action as the callback function.
```
const someModel = types.model("someModel", {
    name: types.string
}).action((self) => ({
    changeNameAsync() {
        someAsyncMethod().then((this as typeof someModel.Type).changeName);
    },
    
    changeName(name) {
        self.name = name;
    }
}));
```


### Testing in Jasmine
*1. Expecting an exception*

Take `functionA` which throw an exception for example.
```
functionA() {
    throw new Error("some random error");
}
```
To catch `functionA`'s exception in Jasmine, use anonymous function.
```
expect(() => functionA()).toThrowError();
```
