import { Link } from 'react-router-dom';

export default function CampoCard({ campo }) {
  return (
    <Link to={`/campos/${campo.id}`} className="group block">
      <div className="aspect-[4/3] rounded-sm bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 flex items-center justify-center overflow-hidden relative">
        {campo.fotoPrincipal ? (
          <img
            src={campo.fotoPrincipal}
            alt={campo.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-ink-soft/60 text-xs uppercase tracking-widest">Foto próximamente</span>
        )}
        {campo.destacado && (
          <span className="absolute top-4 left-4 text-[11px] uppercase tracking-widest bg-olive text-cream px-3 py-1 rounded-full">
            Oportunidad del mes
          </span>
        )}
        <span
          className={`absolute top-4 text-[11px] uppercase tracking-widest bg-cream/90 text-olive-dark px-3 py-1 rounded-full ${
            campo.destacado ? 'right-4' : 'left-4'
          }`}
        >
          {campo.tipo}
        </span>
      </div>
      <div className="pt-5">
        <p className="text-xs uppercase tracking-widest text-earth-dark mb-1">{campo.zona}</p>
        <h3 className="font-serif text-2xl text-ink group-hover:text-olive-dark transition-colors">
          {campo.nombre}
        </h3>
        <div className="flex items-center justify-between mt-3 text-sm text-ink-soft">
          <span>{campo.hectareas} ha</span>
          <span className="text-olive-dark">{campo.precio}</span>
        </div>
      </div>
    </Link>
  );
}
