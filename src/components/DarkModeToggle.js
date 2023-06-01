import React from 'react';

import toggle from './toggle';
import useDarkMode from 'use-dark-mode';

import style from './DarkModeToggle.module.scss'

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <div className={style.darkModeToggle}>
            <button type="button" onClick={darkMode.disable}>🌞</button>
            {/* <toggle checked={darkMode.value} onChange={darkMode.toggle} /> */}
            <button type="button" onClick={darkMode.enable}>🌚</button>
        </div>
    );
};

export default DarkModeToggle;