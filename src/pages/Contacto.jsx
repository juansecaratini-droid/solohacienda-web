import ScrollReveal from '../components/ScrollReveal';
import VenderCampoButton from '../components/VenderCampoButton';

const WHATSAPP_NUMBER = '5491100000000';

export default function Contacto() {
  return (
    <div className="pt-36 pb-28 max-w-6xl mx-auto px-6 md:px-10">
      <ScrollReveal>
        <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-4">Contacto</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h1 className="font-serif text-4xl md:text-5xl max-w-xl leading-[1.1] mb-6">
          Hablemos de tu campo.
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-ink-soft max-w-xl mb-16">
          La vía más rápida para hablar con nosotros es WhatsApp. Sin formularios ni
          esperas: contanos directamente qué estás buscando.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10">
        <ScrollReveal direction="right">
          <div className="bg-cream-dim rounded-sm p-8 h-full flex flex-col">
            <p className="uppercase tracking-[0.2em] text-xs text-olive-dark/80 mb-3">
              Comprar
            </p>
            <h2 className="font-serif text-2xl mb-4">¿Estás buscando campo?</h2>
            <p className="text-ink-soft leading-relaxed mb-8 flex-1">
              Contanos qué zona, superficie y aptitud tenés en mente, y te mostramos
              qué tenemos disponible.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-olive text-cream px-7 py-3.5 text-sm hover:bg-olive-dark transition-colors self-start"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} direction="left">
          <div className="bg-cream-dim rounded-sm p-8 h-full flex flex-col">
            <p className="uppercase tracking-[0.2em] text-xs text-olive-dark/80 mb-3">
              Vender
            </p>
            <h2 className="font-serif text-2xl mb-4">¿Tenés un campo para vender?</h2>
            <p className="text-ink-soft leading-relaxed mb-8 flex-1">
              Lo evaluamos con criterio técnico antes de representarlo. Contanos
              ubicación, superficie y aptitud, y coordinamos una visita.
            </p>
            <VenderCampoButton className="self-start" />
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="mt-16 space-y-3 text-sm text-ink-soft">
          <p>
            <span className="text-ink-soft/60">Email:</span>{' '}
            <a href="mailto:solohacienda@gmail.com" className="hover:text-olive-dark transition-colors">
              solohacienda@gmail.com
            </a>
          </p>
          <p>
            <span className="text-ink-soft/60">Zona de trabajo:</span> Buenos Aires y alrededores
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
