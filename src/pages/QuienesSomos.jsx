import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const PERSONAS = [
  {
    nombre: 'Juan Caratini',
    rol: 'Ingeniero Agrónomo y Martillero',
    foto: '/team/juan-caratini.png',
    texto:
      'Más de 20 años de experiencia en el campo. Antes de que una propiedad entre en venta, la evalúa personalmente: suelo, agua y producción. La mirada técnica que sostiene cada operación de SOLOHACIENDA.',
  },
  {
    nombre: 'Juan Segundo Caratini',
    rol: 'Licenciado en Administración de Empresas',
    foto: '/team/juan-segundo-caratini.png',
    texto:
      'Especializado en Inteligencia Artificial, growth y ventas. Se asegura de que cada operación esté a la altura de las herramientas y el mundo comercial de hoy.',
  },
];

function TeamPhoto({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 flex items-center justify-center mb-6">
        <span className="text-ink-soft/60 text-xs uppercase tracking-widest">Foto próximamente</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="aspect-[3/4] w-full rounded-sm object-cover mb-6"
    />
  );
}

export default function QuienesSomos() {
  return (
    <div className="pt-36 pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-4">
            Quiénes somos
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-serif text-4xl md:text-5xl max-w-2xl leading-[1.1] mb-6">
            Dos generaciones, un mismo oficio.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.18}>
          <p className="text-ink-soft max-w-xl mb-16">
            SOLOHACIENDA combina dos miradas: el conocimiento técnico del campo de toda
            una vida, y las herramientas y el criterio comercial de hoy. Ese balance
            entre lo tradicional y lo nuevo es lo que nos distingue.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.22}>
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-olive-dark/80 whitespace-nowrap">
              Lo tradicional y lo nuevo
            </span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-12">
          {PERSONAS.map((persona, i) => (
            <ScrollReveal key={persona.rol} delay={i * 0.15}>
              <TeamPhoto src={persona.foto} alt={persona.nombre} />
              <h2 className="font-serif text-2xl text-ink">{persona.nombre}</h2>
              <p className="text-sm uppercase tracking-widest text-olive-dark mt-1 mb-4">
                {persona.rol}
              </p>
              <p className="text-ink-soft leading-relaxed">{persona.texto}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
