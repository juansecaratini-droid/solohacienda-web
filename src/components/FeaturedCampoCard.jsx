import { Link } from 'react-router-dom';

export default function FeaturedCampoCard({ campo }) {
  return (
    <Link
      to={`/campos/${campo.id}`}
      className="group grid md:grid-cols-5 gap-6 md:gap-10 items-stretch mb-16 rounded-sm overflow-hidden bg-cream-dim"
    >
      <div className="md:col-span-3 aspect-[16/10] md:aspect-auto bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 relative overflow-hidden">
        {campo.fotoPrincipal ? (
          <img
            src={campo.fotoPrincipal}
            alt={campo.nombre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-ink-soft/60 text-xs uppercase tracking-widest">Foto próximamente</span>
          </div>
        )}
        <span className="absolute top-5 left-5 text-[11px] uppercase tracking-widest bg-olive text-cream px-3 py-1.5 rounded-full">
          Oportunidad del mes
        </span>
      </div>
      <div className="md:col-span-2 flex flex-col justify-center p-6 md:p-8 md:pl-0">
        <p className="text-xs uppercase tracking-widest text-earth-dark mb-2">{campo.zona}</p>
        <h3 className="font-serif text-3xl md:text-4xl text-ink leading-tight group-hover:text-olive-dark transition-colors mb-4">
          {campo.nombre}
        </h3>
        <p className="text-ink-soft leading-relaxed mb-6 line-clamp-3">{campo.resumen}</p>
        <div className="flex items-center justify-between text-sm text-ink-soft border-t border-ink/10 pt-4">
          <span>{campo.hectareas} ha</span>
          <span className="text-olive-dark font-medium">{campo.precio}</span>
        </div>
      </div>
    </Link>
  );
}
