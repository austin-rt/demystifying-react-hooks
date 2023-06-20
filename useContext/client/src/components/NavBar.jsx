import ThemeLabel from './ThemeLabel';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  return (
    <nav>
      <ThemeToggle />
      <ThemeLabel />
    </nav>
  );
};

export default NavBar;
