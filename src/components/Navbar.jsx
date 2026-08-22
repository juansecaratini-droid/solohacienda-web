import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

const LINKS = [
  { to: '/campos', label: 'Campos' },
  { to: '/nosotros', label: 'Quiénes somos' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-sm shadow-[0_1px_0_0_rgba(42,40,32,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/">
          <Logo variant="light" />
        </Link>
        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-olive-dark' : 'text-ink-soft hover:text-olive-dark'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <a
          href="https://wa.me/5491169839411"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-olive px-5 py-2 text-sm text-olive-dark hover:bg-olive hover:text-cream transition-colors"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
