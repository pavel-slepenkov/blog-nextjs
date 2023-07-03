import { useState, useEffect } from 'react';

import style from './CookieBanner.module.scss'

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const hasConsent = localStorage.getItem('cookieConsent');
        setShowBanner(!hasConsent);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className={style.cookieContainer}>
            <p className={style.cookieContainer2}>
                This website uses cookies to ensure you get the best experience. By
                continuing to use this site, you consent to the use of cookies.
            </p>
            <button className={style.cookieContainerBtn} onClick={handleAccept}>
                Accept
            </button>
        </div>
    );
};

export default CookieBanner;
