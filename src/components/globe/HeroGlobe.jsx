import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlobeScene from './GlobeScene';

export default function HeroGlobe() {
  const trackRef = useRef(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.32], [0, -40]);
  const finaleOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const finaleY = useTransform(scrollYProgress, [0.72, 0.97], [36, 0]);
  const finaleScale = useTransform(scrollYProgress, [0.72, 0.97], [0.94, 1]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={trackRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, var(--color-cream-dim) 0%, var(--color-cream) 62%)',
          }}
        />

        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          camera={{ fov: 42, position: [2.65, 1.4, 6.9] }}
          dpr={[1, 2]}
        >
          <GlobeScene progressRef={progressRef} />
        </Canvas>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: introOpacity,
            background:
              'linear-gradient(to right, var(--color-cream) 0%, var(--color-cream) 40%, rgba(247,243,234,0) 66%)',
          }}
        />

        <div className="relative h-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col justify-start pt-32 md:pt-40 pointer-events-none">
          <motion.div style={{ opacity: introOpacity, y: introY }} className="max-w-xl">
            <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-5">
              Asesoría inmobiliaria rural
            </p>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink">
              Conocemos la tierra <span className="italic text-olive-dark">antes</span> de venderla.
            </h1>
            <p className="mt-6 text-lg text-ink-soft max-w-md">
              Trato 1 a 1 y asesoramiento agronómico real para comprar o vender campo
              en Buenos Aires y alrededores. Nada de intermediación a ciegas.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: finaleOpacity, y: finaleY, scale: finaleScale }}
            className="absolute bottom-20 md:bottom-24 left-6 md:left-10 max-w-md pointer-events-auto origin-bottom-left"
          >
            <p className="inline-block text-xs uppercase tracking-[0.2em] text-white bg-ink/45 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
              Buenos Aires, Argentina
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white mb-7 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
              Acá empieza la búsqueda de tu campo.
            </h2>
            <Link
              to="/campos"
              className="inline-flex items-center gap-3 rounded-full bg-olive text-cream px-8 py-4 text-base md:text-lg shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-olive-dark hover:gap-4 transition-all"
            >
              Descubrí nuestros campos
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-ink-soft/70"
        >
          <span className="text-[11px] uppercase tracking-[0.3em]">Desplazate</span>
          <span className="w-px h-8 bg-ink-soft/40" />
        </motion.div>
      </div>
    </section>
  );
}
