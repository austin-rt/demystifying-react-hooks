import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState('');

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const decrementCount = () => {
    setCount(prev => prev - 1);
  };

  const changeTheme = e => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  return (
    <main className={darkMode ? 'dark' : ''}>
      <section>
        <h2>counter</h2>
        <p className='output'>{count || 0}</p>
        <div className='button-container'>
          <button onClick={incrementCount}>increment</button>
          <button onClick={decrementCount}>decrement</button>
        </div>
      </section>
      <section>
        <h2>theme</h2>
        <div className='button-container'>
          <button onClick={changeTheme}>
            {darkMode ? 'light mode' : 'dark mode'}
          </button>
        </div>
      </section>
      <section>
        <h2>input</h2>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
        />
        <p className='output'>{input.trim() || 'user input'}</p>
      </section>
    </main>
  );
}

export default App;
