import { useState } from "react";
import { SunIcon, MoonIcon, ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { Menus } from './CompList';
import PolyLogo from '../style/poly.svg';

export default function Header({ active, onClicked, theme, onThemeToggle }) {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleNavClick(e) {
        setMenuOpen(false);
        onClicked(e);
    }

    return (
        <>
            <header className="site-header">
                {/* Desktop: brand left */}
                <span className="site-brand"><img src={PolyLogo} alt="" className="site-brand-icon" />polyglot.dev</span>

                {/* Desktop: centered nav */}
                <nav className="site-nav">
                    {Menus.map((menu) => (
                        <a
                            key={menu}
                            href="#"
                            className={`nav-link${menu === active ? ' nav-link-active' : ''}`}
                            onClick={onClicked}
                        >
                            {menu}
                        </a>
                    ))}
                </nav>

                {/* Mobile: hamburger (left) + brand (center) via CSS */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <XIcon size={20} /> : <ThreeBarsIcon size={20} />}
                </button>
                <span className="site-brand-mobile">polyglot.dev</span>

                {/* Right: theme toggle (both breakpoints) */}
                <div className="site-header-end">
                    <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
                        {theme === 'dark'
                            ? <SunIcon size={18} />
                            : <MoonIcon size={18} />
                        }
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            {menuOpen && (
                <>
                    <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />
                    <nav className="mobile-drawer">
                        {Menus.map((menu) => (
                            <a
                                key={menu}
                                href="#"
                                className={`drawer-link${menu === active ? ' drawer-link-active' : ''}`}
                                onClick={handleNavClick}
                            >
                                {menu}
                            </a>
                        ))}
                    </nav>
                </>
            )}
        </>
    );
}
