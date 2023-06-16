# `useReducer` – Demystifying React Hooks (Pt. 1)

![header](./assets/png/useReducer-header-small.png)

In this article, we will explore when and how to use React’s `useReducer` hook
and how it relates to the `useState` Hook.

If you'd like, you can skim this as a
[Medium](https://medium.com/@austinrt/demystifying-react-hooks-usereducer-4efd32edc084)
or [dev.to](https://dev.to/austinrt/demystifying-react-hooks-usereducer-587k)
article.

## Getting Started

- `fork and clone`
- `cd client`
- `npm i`
- `npm start`

## `useReducer`

The intended use case for `useReducer` is to manage complex state logic by
taking advantage of the
[Flux](https://medium.com/edge-coders/the-difference-between-flux-and-redux-71d31b118c1)/[Redux](https://redux.js.org/introduction/getting-started)
pattern. And if you don't know Redux, don't worry. In my opinion, `useReducer`
is the perfect place to start learning Redux.

## Why Bother?

Imagine we wanted to pass down all three states for our user to alter them from
inside a child component. We'd have to pass **six** different values: each state
**and** its setter. `useReducer` can simplify our code by **reducing** all of
our state logic into a single function, aptly named a `reducer`. Reducers allow
us to pass **predetermined** `actions` to our state updater to avoid
unintentional state updates. We can even bake in custom error handling to make
debugging easier. Think of it as hand-rolling type-checking for your state. Kind
of... But we're not going down that rabbit hole today.

## Starter Code

As always, let's start with a brief overview of the codebase before we refactor.

`App.js` has three `section`s: a counter, a theme changer, and a text input, all
of which we've neatly rolled into one component to spare us file surfing. Each
`section` has a dedicated instance of the `useState` hook, which we all know and
love.

We have three pieces of state: `input`, `count`, and `darkMode`.

Instead of updating our state inline, we've made four breakout functions:
`handleChange`, `incrementCount`, `decrementCount`, and `changeTheme`, each of
which does exactly what its name implies. The only thing to note here is that,
with `incrementCount` and `decrementCount`, we're using an
[updater function](https://beta.reactjs.org/reference/react/useState#setstate-parameters)
rather than directly passing the new state value. We've done this because the
next value of the state depends on the previous value. A longhand version of the
same function would look like this:

```js
setCount(previousState => {
  return previousState + 1;
});
```

## A Simple Refactor

Let's jump into our refactoring, one piece of state at a time. We'll start by
importing `useReducer` from `'react'`.

```js
import { useState, useReducer } from 'react';
```

Next, we'll initialize our state with `useReducer`.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

## `useReducer` Signature

`useReducer` looks a lot like `useState`. We're still destructuring an array
from the return and passing our initial values as arguments. However, you may
notice that, unlike `useState`, `useReducer` requires two arguments: a `reducer`
function and the `initialState`. The other difference is much more minor.

Our `state` is essentially the same, but rather than explicitly naming each
piece of state, the convention is to create a `state` object, and our
`key`/`value` pairs become our different "pieces" of state. The `dispatch`
function is still our state setter but requires an `action` object as a second
argument.

## Refactoring Counter

First, we'll refactor the `count` state. We'll start by defining our
`initialState` variable. Typically this, along with the `reducer` function,
would be defined elsewhere and imported into our component. For simplicity's
sake, we'll define them in the same file, underneath our `import` statements but
**not** inside our component.

```js
import {useState, useReducer} from 'react';

const initialState = {
  count: 0,
};

function App() {
  ...
```

Next, we'll define our `reducer` function in a "separate file" (same file, but
outside our component). This `reducer` function requires two arguments: our
`state` object and an `action` object. The `action` object will have two keys:
`type` and `payload`. Later, when we dispatch an action, the `type` tells
`useReducer` what we're trying to update, while the `payload` provides the
updated value.

```js
const reducer = (state, action) => {};
```

Inside this reducer, we'll `switch` on the action's `type` property to determine
**what** to do. Of course, you could use any form of conditional logic, but a
`switch` statement is the convention.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      console.log(`Action ${action.type} not found.`);
      return state;
  }
};
```

Notice that in our `default`, we `console.log` some simple feedback and `return`
the unaltered `state`. So if we pass in an action type that doesn't exist,
instead of breaking our app, we're simply made aware that we've not yet built a
`case` to handle this situation. This error handling can be as simple or robust
as your company's style guide requires.

As our `state` complexity grows, we'll need to update and refactor our
`reducer`. But for now, we'll move on to our functions.

Now, in `incrementCount` and `decrementCount`, instead of calling `setCount`, we
call `dispatch`, and pass it the appropriate action as an object.

```js
const incrementCount = () => {
  dispatch({ type: 'increment' });
};

const decrementCount = () => {
  dispatch({ type: 'decrement' });
};
```

And lastly, since `count` is now nested inside our `state` object, we need to
update our `count` reference in our JSX.

```js
<p className='output'>{state.count}</p>
```

Now we can remove our `count` `useState` instance and test our App. It will work
the same! And you'll notice our other two pieces of state still work just fine.

That's great! We've added more code that's complicated our app and reduced
readability with no tangible advantages! How cool!

Settle down. Now is where we start to see some advantages. It's time to
**reduce** our state into a single object.

## Refactoring darkMode

We'll start this process by adding `darkMode` to our `initialState` object. In
our case, the default is `true` because I'm a gremlin.

```js
const initialState = {
  count: 0,
  darkMode: 'dark'
};
```

Next, we'll add a `case` to our `reducer` to handle the `darkMode` update.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'darkMode':
      return { darkMode: action.payload };
    default:
      console.log(`Action ${action.type} not found.`);
      return state;
  }
};
```

As before, let's update our `changeTheme` function to dispatch the appropriate
`action`. This time, we need not only a `type` but also a `payload`. The `type`
will be `darkMode`, and the `payload` will be the opposite of `darkMode`'s
current value.

```js
const changeTheme = () => {
  dispatch({ type: 'darkMode', payload: !state.darkMode });
};
```

Lastly, we'll update the reference in our JSX.

```js
<button onClick={changeTheme}>
  {state.darkMode ? 'light mode' : 'dark mode'}
</button>
```

Now you'll see that we can, again, toggle between light and dark modes! And if
we test our counter we find that...

We broke our app.

Luckily this is an easy fix. When we update our `state` object, it's completely
overwriting the previous `state` object, but we want to preserve all previous
values and only update the one being changed. So, in our `reducer`, all we need
to do is
[spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
the current state before updating.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'darkMode':
      return { ...state, darkMode: action.payload };
    default:
      console.log(`Action ${action.type} not found.`);
      return state;
  }
};
```

Works like a charm! We can now remove our `darkMode` `useState` instance.

## Refactor `input`

Our last piece of state to update is our `input`. This will be the same process
as before.

First, we add an `input` to our `initialState` object.

```js
const initialState = {
  count: 0,
  darkMode: true,
  input: ''
};
```

Next, we add a `case` to our `reducer` to handle the `input` update.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'darkMode':
      return { ...state, darkMode: action.payload };
    case 'input':
      return { ...state, input: action.payload };
    default:
      console.log(`Action ${action.type} not found.`);
      return state;
  }
};
```

Next, we update our `handleInputChange` function to dispatch the appropriate
`action`.

```js
const handleInputChange = e => {
  dispatch({ type: 'input', payload: e.target.value });
};
```

And lastly, we update our JSX to reference the proper `input` value.

```js
<input
  type='text'
  value={state.input}
  onChange={handleInputChange}
/>
<p className='output'>{state.input.trim() || 'user input'}</p>
```

Now we can remove our last instance of `useState` and test our app.

It works! Congrats! You've just built your first React App that updates state
without `useState`!

## Refactoring Our `action` Object

Now that our app is fully functional, there are a few more things we can do to
optimize our code. We'll start by refactoring our `action` object. Rather than
evaluating our state updates based on passing around strings, we can make our
`action` object a const that we then reference in our `reducer`. Not only does
this help us avoid typos, but if we need to update our `action` object, we only
need to do so in one place, making our app much more maintainable.

Again, in a "separate" file, we'll define a proper `const` using all caps.

```js
const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  DARK_MODE: 'darkMode',
  INPUT: 'input'
};
```

Now, in our `reducer`, instead of comparing `action.type` to a string, we can
compare it to `ACTION`.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.DARK_MODE:
      return { ...state, darkMode: action.payload };
    case ACTION.INPUT:
      return { ...state, input: action.payload };
    default:
      console.log(`Action ${action.type} not found.`);
      return state;
  }
};
```

And in our `dispatch` calls, we'll remove the strings and reference the `ACTION`
`const` as our `type`.

```js
const incrementCount = () => {
  dispatch({ type: ACTION.INCREMENT });
};

const decrementCount = () => {
  dispatch({ type: ACTION.DECREMENT });
};

const changeTheme = e => {
  dispatch({ type: ACTION.DARK_MODE, payload: !state.darkMode });
};

const handleInputChange = e => {
  dispatch({ type: ACTION.INPUT, payload: e.target.value });
};
```

You'll notice that this approach not only avoids typos and makes your code more
maintainable, but now your IDE offers you autocomplete suggestions.

## The Tradeoffs

As with everything in development, there are tradeoffs. In this case, we seem to
have simplified our state by complicating it. Obviously, this is overkill for a
counter app with a random input field and a light/dark mode toggle. But as our
apps grow, we'll find that this pattern, while heavy on the setup, simplifies
overall. For example, take a look at this state tree from Airbnb. Or, head to
[airbnb.com](https://airbnb.com) and see for yourself using the Redux DevTools.

![airbnb state trace tree](/useReducer/assets/png/airbnb-state-trace.png)

Now, imagine a different `useState` hook for each of those values. And imagine
if you needed to pass these values around your app. There would be so much prop
drilling that your code would be entirely unreadable.

## Conclusions

So, when should you use `useState`, and when should you use `useReducer`?

That, my friend, is up to you (or your future company's style guide and coding
principles). If you're able to accurately predict the complexity of your app,
the extra work to set up `useReducer` from the start might be worth it. If you
know you won't be scaling up, or you're okay with the future tech debt, maybe
you stick with `useState`. The most likely scenario is that you'll use a mixture
of both.

Either way, you now have the tools to make an informed decision. And that's
arguably more important than what you decide. And now that you're armed with
this knowledge, add a central store or some slices for your state, and you're
using Redux!

<hr/>
I’m always looking for new friends and colleagues. If you found this article
helpful and would like to connect, you can find me at any of my homes on the
web.

[GitHub](https://github.com/austin-rt) | [Twitter](https://twitter.com/0xStink)
| [LinkedIn](https://www.linkedin.com/in/austinrt) |
[Website](https://austinrt.io) | [Medium](https://austinrt.medium.com/) |
[Dev.to](https://dev.to/austinrt)

<hr/>

## Resources

- [useRecucer](https://beta.reactjs.org/reference/react/useReducer)
- [useState](https://beta.reactjs.org/reference/react/useState)
- [Flux](https://medium.com/edge-coders/the-difference-between-flux-and-redux-71d31b118c1)
- [Redux](https://redux.js.org/introduction/getting-started)
- [ES6 Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
