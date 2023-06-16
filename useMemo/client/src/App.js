import './App.css';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <div>
      <header className='App-header'>
        <Routes>
          <Route
            path='/'
            element={<Books />}
          />
          <Route
            path='/:id'
            element={<BookDetails />}
          />
        </Routes>
      </header>
=======
import { useState, useCallback } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');

  const jacobsthal = useCallback((n) => {
    if (n < 2) return n;
    return jacobsthal(n - 1) + 2 * jacobsthal(n - 2);
  }, []);

  const calculation = jacobsthal(number);

  return (
    <div>
      <main>
        <section>
          <div className='user-input'>
            <input
              type='text'
              value={number}
              placeholder='desired index'
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <div className='result'>{calculation || 0}</div>
        </section>
        <section>
          <div className='user-input'>
            <input
              type='text'
              value={input}
              placeholder='user input'
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div className='result'>{input || '--'}</div>
        </section>
      </main>
>>>>>>> memo/main
    </div>
  );
}

export default App;
