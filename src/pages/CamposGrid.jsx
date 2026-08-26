import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import CampoCard from '../components/CampoCard';
import FeaturedCampoCard from '../components/FeaturedCampoCard';
import VenderCampoButton from '../components/VenderCampoButton';
import { CAMPOS } from '../data/campos';

const TODOS = 'todos';
const TODAS = 'todas';

function pillClass(active) {
  return `text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
    active
      ? 'bg-olive text-cream border-olive'
      : 'border-ink/20 text-ink-soft hover:border-olive-dark hover:text-olive-dark'
  }`;
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="5" x2="16" y2="5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13" x2="16" y2="13" />
    </svg>
  );
}

export default function CamposGrid() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(TODOS);
  const [zonaFiltro, setZonaFiltro] = useState(TODAS);
  const [haMin, setHaMin] = useState('');
  const [haMax, setHaMax] = useState('');

  const tipos = useMemo(
    () => Array.from(new Set(CAMPOS.map((c) => c.tipo))).sort(),
    []
  );
  const zonas = useMemo(
    () => Array.from(new Set(CAMPOS.map((c) => c.zona))).sort(),
    []
  );

  const cantidadFiltrosActivos =
    (tipoFiltro !== TODOS ? 1 : 0) +
    (zonaFiltro !== TODAS ? 1 : 0) +
    (haMin !== '' ? 1 : 0) +
    (haMax !== '' ? 1 : 0);
  const hayFiltrosActivos = cantidadFiltrosActivos > 0;

  const filtrados = useMemo(() => {
    const min = haMin ? Number(haMin) : null;
    const max = haMax ? Number(haMax) : null;
    const resultado = CAMPOS.filter((c) => {
      if (tipoFiltro !== TODOS && c.tipo !== tipoFiltro) return false;
      if (zonaFiltro !== TODAS && c.zona !== zonaFiltro) return false;
      if (min !== null && c.hectareas < min) return false;
      if (max !== null && c.hectareas > max) return false;
      return true;
    });

    if (!hayFiltrosActivos) {
      const precioNumerico = (c) => Number(c.precio.replace(/[^0-9]/g, ''));
      return [...resultado].sort((a, b) => precioNumerico(b) - precioNumerico(a));
    }

    return resultado;
  }, [tipoFiltro, zonaFiltro, haMin, haMax, hayFiltrosActivos]);

  const destacado = filtrados.find((c) => c.destacado);
  const resto = filtrados.filter((c) => c.id !== destacado?.id);

  const limpiarFiltros = () => {
    setTipoFiltro(TODOS);
    setZonaFiltro(TODAS);
    setHaMin('');
    setHaMax('');
  };

  return (
    <div className="pt-36 pb-28 max-w-6xl mx-auto px-6 md:px-10">
      <ScrollReveal>
        <p className="uppercase tracking-[0.25em] text-xs text-olive-dark/80 mb-4">
          Nuestros campos
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h1 className="font-serif text-4xl md:text-5xl max-w-2xl leading-[1.1] mb-6">
          Una selección chica, elegida con criterio.
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.18}>
        <p className="text-ink-soft max-w-xl mb-14">
          No publicamos todo lo que aparece. Estos son los campos que representamos hoy,
          cada uno relevado por nosotros antes de ofrecerlo.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.22}>
        <div className="border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setFiltrosAbiertos((o) => !o)}
              className="relative inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink hover:text-olive-dark transition-colors"
            >
              <FilterIcon />
              Filtros
              {hayFiltrosActivos && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-olive text-cream text-[10px] tracking-normal normal-case">
                  {cantidadFiltrosActivos}
                </span>
              )}
            </button>

            <p className="text-sm text-ink-soft/70">
              {filtrados.length} campo{filtrados.length === 1 ? '' : 's'} encontrado{filtrados.length === 1 ? '' : 's'}
            </p>
          </div>

          <AnimatePresence initial={false}>
            {filtrosAbiertos && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-x-10 gap-y-5 pt-6 pb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-ink-soft/60 mr-1">Tipo</span>
                    <button type="button" onClick={() => setTipoFiltro(TODOS)} className={pillClass(tipoFiltro === TODOS)}>
                      Todos
                    </button>
                    {tipos.map((t) => (
                      <button key={t} type="button" onClick={() => setTipoFiltro(t)} className={pillClass(tipoFiltro === t)}>
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-ink-soft/60">Hectáreas</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      placeholder="Desde"
                      value={haMin}
                      onChange={(e) => setHaMin(e.target.value)}
                      className="w-20 border-b border-ink/20 bg-transparent py-1 text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-olive"
                    />
                    <span className="text-ink-soft/40">–</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      placeholder="Hasta"
                      value={haMax}
                      onChange={(e) => setHaMax(e.target.value)}
                      className="w-20 border-b border-ink/20 bg-transparent py-1 text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-olive"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-ink-soft/60">Zona</span>
                    <select
                      value={zonaFiltro}
                      onChange={(e) => setZonaFiltro(e.target.value)}
                      className="border-b border-ink/20 bg-transparent py-1 text-sm text-ink focus:outline-none focus:border-olive"
                    >
                      <option value={TODAS}>Todas</option>
                      {zonas.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>

                  {hayFiltrosActivos && (
                    <button
                      type="button"
                      onClick={limpiarFiltros}
                      className="text-xs uppercase tracking-widest text-earth-dark hover:text-olive-dark transition-colors md:ml-auto"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-b border-ink/10 mb-6" />
      </ScrollReveal>

      {filtrados.length === 0 ? (
        <p className="text-ink-soft text-center py-20">
          No encontramos campos con esos filtros. Probá ajustarlos.
        </p>
      ) : (
        <>
          {destacado && (
            <ScrollReveal>
              <FeaturedCampoCard campo={destacado} />
            </ScrollReveal>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {resto.map((campo, i) => (
              <ScrollReveal key={campo.id} delay={i * 0.08}>
                <CampoCard campo={campo} />
              </ScrollReveal>
            ))}
          </div>
        </>
      )}

      <ScrollReveal>
        <div className="mt-24 pt-14 border-t border-ink/10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
            ¿Tenés un campo para vender?
          </h2>
          <p className="text-ink-soft max-w-md mx-auto mb-8">
            Lo evaluamos con criterio técnico antes de representarlo. Contanos
            ubicación, superficie y aptitud, y coordinamos una visita.
          </p>
          <VenderCampoButton />
        </div>
      </ScrollReveal>
    </div>
  );
}
