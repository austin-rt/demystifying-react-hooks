import './index.css';
import NavBar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme}>
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
