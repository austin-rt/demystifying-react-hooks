import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <div
      className='theme-slider-toggle'
      onClick={toggleTheme}
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

export default ThemeToggle;
