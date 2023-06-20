import ThemeLabel from './ThemeLabel';
import ThemeToggle from './ThemeToggle';

const NavBar = ({ theme, toggleTheme }) => {
  return (
    <nav>
      <ThemeToggle toggleTheme={toggleTheme} />
      <ThemeLabel theme={theme} />
    </nav>
  );
};

export default NavBar;
