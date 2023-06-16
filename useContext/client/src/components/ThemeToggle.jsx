import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSliderToggle = () => {
  const { handleThemeChange } = useContext(ThemeContext);

  return (
    <div
      className='theme-slider-toggle'
      onClick={handleThemeChange}
    >
      <div className='toggle'>
        <div className='slider' />
        <div className='icon-container'>
          <FiSun className='sun-icon' />
          <div className='spacer'></div>
          <FiMoon className='moon-icon' />
        </div>
      </div>
    </div>
  );
};

export default ThemeSliderToggle;
