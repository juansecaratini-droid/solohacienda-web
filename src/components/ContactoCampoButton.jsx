import { useEffect, useRef, useState } from 'react';

const DEFAULT_WHATSAPP = '5491169839411';
const DEFAULT_DISPLAY = '+54 9 11 6983-9411';

// "Campo Lincoln" -> "Lincoln", "Estancia Santa Inés" -> "Santa Inés", so the
// prefilled message reads naturally regardless of how the campo is named.
function shortCampoName(nombre) {
  return nombre.replace(/^(Campo|Estancia)\s+/i, '');
}

export default function ContactoCampoButton({ campo, label = 'Consultar por este campo', className = '' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

  const whatsapp = campo.contacto?.whatsapp ?? DEFAULT_WHATSAPP;
  const display = campo.contacto?.telefonoDisplay ?? DEFAULT_DISPLAY;
  const prefilledMessage = `Hola, cómo estás? Vi el campo de ${shortCampoName(campo.nombre)} en la web y me interesa`;
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(prefilledMessage)}`;

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(display);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1400);
    } catch {
      // Clipboard not available; leave the popover open so the user can select the number manually.
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-full bg-olive text-cream px-6 py-3 text-sm hover:bg-olive-dark transition-colors"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-60 left-1/2 -translate-x-1/2 rounded-sm bg-cream border border-ink/10 shadow-[0_12px_30px_rgba(0,0,0,0.15)] overflow-hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-ink hover:bg-cream-dim transition-colors"
          >
            Abrir WhatsApp
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="block w-full text-left px-4 py-3 text-sm text-ink hover:bg-cream-dim transition-colors border-t border-ink/10"
          >
            {copied ? 'Número copiado ✓' : `Copiar número (${display})`}
          </button>
        </div>
      )}
    </div>
  );
}
