# `useContext` – Demystifying React Hooks (Pt. 6)

![header](./assets/pngs/useContext-header-small.png)

In this lesson, we will explore the `useContext` Hook in React and how it can help us eliminate prop
drilling and create cleaner and more organized code. We will start by understanding the concept of
prop drilling and its limitations, and then we will refactor some code to demonstrate how
`useContext` can provide an alternate solution.

## What is Prop Drilling?

Prop drilling refers to the passing props through multiple layers of components to reach a deeply
nested component that needs access to the data. In large applications with complex component
hierarchies, prop drilling can lead to code that is hard to maintain and understand.

![prop drilling](./assets/pngs/prop-drilling.png)

As your application grows, it's easy to see how this quickly becomes unreadable and unmaintainable
for other developers.

Let's consider our simple Dark Theme Toggle starter code. To spin up our application:

- `cd client`
- `npm install`
- `npm run dev`
- open `http://localhost:5173/` in your browser

In App.jsx, we habve the state and functionality of our Dark Theme Toggle. Notice we dynamically set
the `className` based on our `theme` state.

```js
<div className={theme}>
```

We then pass `theme` and `toggleTheme` down to the `NavBar` component as props.

```js
<NavBar
  theme={theme}
  toggleTheme={toggleTheme}
/>
```

In NavBar.js we destructure our props and pass them down to children.

```js
const NavBar = ({ theme, toggleTheme }) => {
  return (
    <nav>
      <ThemeToggle toggleTheme={toggleTheme} />
      <ThemeLabel theme={theme} />
    </nav>
  );
};

export default NavBar;
```

Then, in `ThemeLabel.jsx` and `ThemeToggle.jsx` we actually make use of these props.

```js
return <div>Theme: {theme}</div>;
```

```js
    <div
      className='theme-slider-toggle'
      onClick={toggleTheme}
    >
```

This is a simple example, but imagine if we had a more complex application with many more components
that each needed access to our `theme` state and setter function. It would get really messy really
fast.

## Limitations of Prop Drilling

Code Maintainability: As the application grows and the component hierarchy becomes more complex, it
becomes challenging to track where the props are being passed and which components are dependent on
them. It can make the code harder to understand and maintain.

Prop Clutter: Prop drilling can lead to a large number of props being passed down to components that
don't directly use them. This creates clutter in the component code and can make it harder to
identify the props that are actually relevant.

Brittleness: If the structure of the component hierarchy changes, it requires updating the prop
passing logic at multiple levels. This can introduce bugs and make the code more brittle.

## Introducing useContext

According to the [React Documentation](https://react.dev/reference/react/useContext), useContext is
a React Hook that lets you read and subscribe to context from your component. By leveraging the
`useContext` Hook, you're able to access data from within any given component without having to pass
props down.

We'll start by creating our context. In your `src` directory,
