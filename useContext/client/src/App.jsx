import { useState } from 'react';
import './index.css';
import ThemeLabel from './components/ThemeLabel';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState('light');

  const handleClick = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme}>
      <main className={theme}>
        <section className={theme}>
          <ThemeLabel theme={theme} />
          <ThemeToggle
            theme={theme}
            handleClick={handleClick}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
