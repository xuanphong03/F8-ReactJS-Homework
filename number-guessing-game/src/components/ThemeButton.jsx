import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { storageKeys, themes } from "../constants";

ThemeButton.propTypes = {};

function ThemeButton() {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem(storageKeys.THEME);
    return currentTheme ? currentTheme : themes.LIGHT;
  });

  useEffect(() => {
    if (theme === themes.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
    setTheme(newTheme);
    localStorage.setItem(storageKeys.THEME, newTheme);
  };

  return (
    <div>
      <button
        onClick={handleThemeSwitch}
        className="text-black dark:text-white text-xl flex items-center justify-center rounded p-2 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        {theme === "dark" ? <MdSunny /> : <IoMdMoon />}
      </button>
    </div>
  );
}

export default ThemeButton;
