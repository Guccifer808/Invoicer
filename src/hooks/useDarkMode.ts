// import { useEffect, useState } from 'react'

// function useDarkMode() {
//  const [theme, setTheme] = useState(localStorage.theme)

//  const colorTheme = theme === 'dark' ? 'light' : 'dark'

//  useEffect(()=> {
//     const root = window.document.documentElement;
//     root.classList.remove(colorTheme)
//     root.classList.add(theme)
//     localStorage.setItem('theme', theme)
//  }, [theme, colorTheme])
//  return[colorTheme, setTheme]
// }

// export default useDarkMode

import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type Theme = 'dark' | 'light';

function useDarkMode(): [Theme, Dispatch<SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const colorTheme: Theme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;
