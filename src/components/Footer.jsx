import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <Logo variant="dark" />
          <p className="mt-3 text-sm text-cream/70 max-w-xs">
            Asesoría inmobiliaria rural personalizada. Trato directo y conocimiento
            técnico real del campo, en Buenos Aires y alrededores.
          </p>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-widest text-cream/50 mb-3">Navegación</p>
          <ul className="space-y-2">
            <li><Link to="/campos" className="hover:text-sand transition-colors">Campos</Link></li>
            <li><Link to="/nosotros" className="hover:text-sand transition-colors">Quiénes somos</Link></li>
            <li><Link to="/contacto" className="hover:text-sand transition-colors">Contacto</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-widest text-cream/50 mb-3">Contacto</p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <a href="https://wa.me/5491169839411" target="_blank" rel="noreferrer" className="hover:text-sand transition-colors">
                +54 9 11 6983-9411
              </a>
            </li>
            <li>
              <a href="mailto:solohacienda@gmail.com" className="hover:text-sand transition-colors">
                solohacienda@gmail.com
              </a>
            </li>
            <li className="text-cream/60">Buenos Aires, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} SOLOHACIENDA. Todos los derechos reservados.
      </div>
    </footer>
  );
}
