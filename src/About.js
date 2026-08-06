import React, { useState, useEffect, useRef } from "react";
import "./style/index.css";
import "purecss/build/pure-min.css"
import "purecss/build/grids-responsive-min.css";
import { Header, getTheme, CompMap } from "./comp/CompList";
import { setTheme, toggleTheme } from "./util/Theme";

const MOBILE_BREAKPOINT = 768;

export default function About() {
    const [show, setShow] = useState("Home");
    const [theme, setThemeState] = useState(getTheme());
    const [toast, setToast] = useState(null);
    const toastKey = useRef(0);
    const toastTimer = useRef(null);

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    useEffect(() => {
        return () => clearTimeout(toastTimer.current);
    }, []);

    const VisibleComponent = CompMap[show];

    function headerClicked(e) {
        e.preventDefault();
        const page = e.target.innerText;
        setShow(page);

        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            clearTimeout(toastTimer.current);
            toastKey.current += 1;
            setToast({ label: page, key: toastKey.current });
            toastTimer.current = setTimeout(() => setToast(null), 2000);
        }
    }

    function handleThemeToggle() {
        toggleTheme();
        setThemeState(getTheme());
    }

    return (
        <div>
            <Header
                onClicked={headerClicked}
                active={show}
                theme={theme}
                onThemeToggle={handleThemeToggle}
            />
            <div id="div-center">
                <VisibleComponent theme={theme} />
            </div>
            {toast && (
                <div key={toast.key} className="nav-toast">{toast.label}</div>
            )}
        </div>
    );
}
