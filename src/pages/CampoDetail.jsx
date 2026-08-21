import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';
import ContactoCampoButton from '../components/ContactoCampoButton';
import { CAMPOS, getCampoById } from '../data/campos';

export default function CampoDetail() {
  const { id } = useParams();
  const campo = getCampoById(id) ?? CAMPOS[0];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const lightboxImages = useMemo(() => {
    const images = [];
    if (campo.imagenSatelital) {
      images.push({ src: campo.imagenSatelital, alt: `Imagen satelital de ${campo.nombre}` });
    }
    for (const src of campo.galeria ?? []) {
      images.push({ src, alt: `Foto de ${campo.nombre}` });
    }
    return images;
  }, [campo]);

  const satelitalIndex = campo.imagenSatelital ? 0 : -1;
  const galeriaStartIndex = campo.imagenSatelital ? 1 : 0;

  return (
    <div className="pt-32 pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <Link to="/campos" className="text-sm text-ink-soft hover:text-olive-dark transition-colors">
            ← Volver a campos
          </Link>
        </ScrollReveal>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <ScrollReveal>
            {campo.destacado && (
              <span className="inline-block text-[11px] uppercase tracking-widest bg-olive text-cream px-3 py-1 rounded-full mb-3">
                Oportunidad del mes
              </span>
            )}
            <p className="text-xs uppercase tracking-widest text-earth-dark mb-2">{campo.zona}</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">{campo.nombre}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-serif text-3xl text-olive-dark">{campo.precio}</p>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
          {campo.fotoPrincipal ? (
            <img
              src={campo.fotoPrincipal}
              alt={campo.nombre}
              className="w-full aspect-[16/7] rounded-sm object-cover"
            />
          ) : (
            <div className="aspect-[16/7] rounded-sm bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 flex items-center justify-center">
              <span className="text-ink-soft/60 text-sm uppercase tracking-widest">
                Fotos e imágenes satelitales próximamente
              </span>
            </div>
          )}
        </div>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <ScrollReveal>
            <h2 className="font-serif text-2xl mb-4 text-olive-dark">Sobre el campo</h2>
            <p className="text-ink-soft leading-relaxed">{campo.resumen}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-2xl mt-12 mb-4 text-olive-dark">Destacados</h2>
            <ul className="space-y-3">
              {campo.destacados.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.13}>
            <div className="mt-10 border-t border-b border-ink/10 py-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-ink-soft text-sm">
                ¿Te interesa este campo? Escribinos y coordinamos una visita.
              </p>
              <ContactoCampoButton campo={campo} className="w-full sm:w-auto sm:min-w-[240px]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="font-serif text-2xl mt-12 mb-4 text-olive-dark">Imagen satelital</h2>
            {campo.imagenSatelital ? (
              <button
                type="button"
                onClick={() => setLightboxIndex(satelitalIndex)}
                className="w-full max-h-[600px] rounded-sm bg-cream-dim flex items-center justify-center overflow-hidden cursor-zoom-in group"
              >
                <img
                  src={campo.imagenSatelital}
                  alt={`Imagen satelital de ${campo.nombre}`}
                  className="w-full max-h-[600px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
            ) : (
              <div className="aspect-[16/10] rounded-sm bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 flex items-center justify-center">
                <span className="text-ink-soft/60 text-sm uppercase tracking-widest">
                  Imagen satelital próximamente
                </span>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="font-serif text-2xl mt-12 mb-4 text-olive-dark">Galería</h2>
            {campo.galeria?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {campo.galeria.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(galeriaStartIndex + i)}
                    className="cursor-zoom-in group overflow-hidden rounded-sm"
                  >
                    <img
                      src={src}
                      alt={`Foto de ${campo.nombre}`}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ink/20 rounded-sm p-8 text-center text-ink-soft/70 text-sm">
                Galería de fotos próximamente.
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <h2 className="font-serif text-2xl mt-12 mb-4 text-olive-dark">Documentación</h2>
            <div className="border border-dashed border-ink/20 rounded-sm p-8 text-center text-ink-soft/70 text-sm">
              Informe de suelo, plano y demás documentación se van a sumar próximamente.
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={0.1}>
          <div className="bg-cream-dim rounded-sm p-8 sticky top-28">
            <p className="text-xs uppercase tracking-widest text-ink-soft/70 mb-6">Ficha técnica</p>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-ink-soft">Superficie</dt>
                <dd className="text-ink">{campo.hectareas} ha</dd>
              </div>
              {campo.precioPorHectarea && (
                <div className="flex justify-between border-b border-ink/10 pb-3">
                  <dt className="text-ink-soft">Precio por ha</dt>
                  <dd className="text-ink text-right">{campo.precioPorHectarea}</dd>
                </div>
              )}
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-ink-soft">Tipo</dt>
                <dd className="text-ink">{campo.tipo}</dd>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-ink-soft">Aptitud</dt>
                <dd className="text-ink text-right">{campo.aptitud}</dd>
              </div>
              {campo.sembrado && (
                <div className="flex justify-between border-b border-ink/10 pb-3">
                  <dt className="text-ink-soft">Sembrado</dt>
                  <dd className="text-ink text-right">{campo.sembrado}</dd>
                </div>
              )}
              {campo.agua && (
                <div className="flex justify-between border-b border-ink/10 pb-3">
                  <dt className="text-ink-soft">Agua</dt>
                  <dd className="text-ink text-right">{campo.agua}</dd>
                </div>
              )}
              {campo.suelos && (
                <div className="flex justify-between border-b border-ink/10 pb-3">
                  <dt className="text-ink-soft">Suelos</dt>
                  <dd className="text-ink text-right">{campo.suelos}</dd>
                </div>
              )}
              <div className="flex justify-between pb-1">
                <dt className="text-ink-soft">Zona</dt>
                <dd className="text-ink text-right">{campo.zona}</dd>
              </div>
            </dl>
            <ContactoCampoButton campo={campo} className="w-full mt-8" />
            {campo.contacto && (
              <div className="mt-4 text-center text-xs text-ink-soft space-y-1">
                <p>{campo.contacto.telefonoDisplay}</p>
                <a
                  href={`https://instagram.com/${campo.contacto.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-olive-dark transition-colors"
                >
                  {campo.contacto.instagram}
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 mt-20 pt-14 border-t border-ink/10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
            ¿Querés más información sobre {campo.nombre}?
          </h2>
          <p className="text-ink-soft max-w-md mx-auto mb-8">
            Escribinos y coordinamos una visita o te mandamos la documentación completa.
          </p>
          <ContactoCampoButton campo={campo} className="w-full max-w-xs mx-auto" />
        </div>
      </ScrollReveal>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
