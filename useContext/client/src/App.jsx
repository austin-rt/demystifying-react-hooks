import './index.css';
import { useContext } from 'react';
import NavBar from './components/Navbar';
import ThemeContext from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <NavBar />
    </div>
  );
}

export default App;
