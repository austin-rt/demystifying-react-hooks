import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSliderToggle = ({ theme, handleClick }) => {
  return (
    <div
      className={`theme-slider-toggle ${theme}`}
      onClick={handleClick}
    >
      <div className='toggle'>
        <div className='slider' />
        <div className='icon-container'>
          <FiSun className='sun-icon' />
          <div classname='spacer'></div>
          <FiMoon className='moon-icon' />
        </div>
      </div>
    </div>
  );
};

export default ThemeSliderToggle;
