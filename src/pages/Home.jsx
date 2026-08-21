import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroGlobe from '../components/globe/HeroGlobe';
import ScrollReveal from '../components/ScrollReveal';
import VenderCampoButton from '../components/VenderCampoButton';

const PILARES = [
  {
    title: 'Trato directo',
    text: 'Un solo interlocutor de principio a fin. Sin escritorios de venta ni traspasos de mano en el medio del proceso.',
  },
  {
    title: 'Conocimiento agronómico real',
    text: 'SOLOHACIENDA fue fundada por Juan Caratini, Ingeniero Agrónomo. El diagnóstico de suelo, agua y producción no se terceriza: es la base de cada evaluación que hacemos.',
  },
  {
    title: 'Volumen bajo, foco alto',
    text: 'No manejamos un catálogo masivo. Elegimos con cuidado los campos que representamos para poder asesorar en serio.',
  },
];

function ComoTrabajamosFoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[4/3] rounded-sm bg-gradient-to-br from-sand via-cream-deep to-olive-light/40 flex items-center justify-center">
        <span className="text-ink-soft/60 text-sm uppercase tracking-widest">Foto de campo próximamente</span>
      </div>
    );
  }

  return (
    <img
      src="/home/como-trabajamos.jpg"
      alt="Manejo de hacienda en el campo"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full rounded-sm object-cover"
    />
  );
}

export default function Home() {
  return (
    <>
      <HeroGlobe />

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28">
        <ScrollReveal>
          <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-4">
            Por qué SOLOHACIENDA
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-[1.1] mb-16">
            Asesoramiento inmobiliario rural, con la tierra como oficio de familia.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {PILARES.map((pilar, i) => (
            <ScrollReveal key={pilar.title} delay={i * 0.12}>
              <div className="border-t border-ink/10 pt-6">
                <h3 className="font-serif text-xl mb-3 text-olive-dark">{pilar.title}</h3>
                <p className="text-ink-soft leading-relaxed">{pilar.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-dim">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-28 grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right">
            <ComoTrabajamosFoto />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-4">
              Cómo trabajamos
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
              Antes de publicar un campo, lo caminamos.
            </h2>
            <p className="text-ink-soft leading-relaxed mb-8">
              Relevamos suelo, agua y aptitud productiva antes de representar cualquier
              propiedad. Eso nos permite responder con precisión las preguntas que
              importan, no solo las que están en el folleto.
            </p>
            <Link
              to="/campos"
              className="inline-flex items-center gap-2 text-olive-dark border-b border-olive-dark pb-1 hover:gap-3 transition-all"
            >
              Ver campos disponibles →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl max-w-xl mx-auto leading-tight mb-6">
            ¿Estás pensando en comprar o vender un campo?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-ink-soft max-w-md mx-auto mb-10">
            Hablemos directo, sin vueltas. Contanos qué estás buscando o qué campo
            tenés en mente.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-olive text-cream px-8 py-3.5 text-sm hover:bg-olive-dark transition-colors"
            >
              Contactanos
            </Link>
            <VenderCampoButton variant="outline" />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
