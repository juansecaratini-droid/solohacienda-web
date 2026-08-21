import { useCallback, useEffect, useRef } from 'react';

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const touchStartX = useRef(null);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, onClose]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-5 right-5 md:top-8 md:right-8 text-cream/80 hover:text-cream text-3xl leading-none w-11 h-11 flex items-center justify-center"
      >
        ×
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Foto anterior"
          className="absolute left-1 md:left-6 text-cream/80 hover:text-cream text-4xl w-12 h-12 flex items-center justify-center"
        >
          ‹
        </button>
      )}

      <img
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[88vw] max-h-[82vh] object-contain rounded-sm select-none"
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Foto siguiente"
          className="absolute right-1 md:right-6 text-cream/80 hover:text-cream text-4xl w-12 h-12 flex items-center justify-center"
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <p className="absolute bottom-5 md:bottom-8 text-cream/70 text-xs uppercase tracking-widest">
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
