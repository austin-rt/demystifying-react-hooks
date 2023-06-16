const ThemeToggle = ({ handleClick, theme }) => {
  return (
    <button
      onClick={handleClick}
      className={theme}
    >
      Toggle Theme
    </button>
  );
};
export default ThemeToggle;
