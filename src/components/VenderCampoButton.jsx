const WHATSAPP_NUMBER = '5491100000000';
const MENSAJE = 'Hola, ¿cómo estás? Quiero vender mi campo con ustedes';

export default function VenderCampoButton({ className = '', variant = 'solid' }) {
  const base = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm transition-colors';
  const styles =
    variant === 'solid'
      ? 'bg-olive text-cream hover:bg-olive-dark'
      : 'border border-olive text-olive-dark hover:bg-olive hover:text-cream';

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MENSAJE)}`}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      Quiero vender mi campo con ustedes
    </a>
  );
}
