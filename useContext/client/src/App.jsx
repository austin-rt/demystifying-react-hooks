import { useState } from 'react';
import NavBar from './components/NavBar';

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
