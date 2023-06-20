import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemeLabel = () => {
  const { theme } = useContext(ThemeContext);

  return <div>Theme: {theme}</div>;
};
export default ThemeLabel;
