export default function Logo({ variant = 'light', className = '' }) {
  const color = variant === 'light' ? 'text-olive-dark' : 'text-cream';

  return (
    <span className={`inline-flex flex-col leading-none select-none ${color} ${className}`}>
      <span className="font-sans font-extrabold uppercase tracking-tight text-[1.15rem]">
        SOLOHACIENDA
      </span>
      <span className="font-sans font-bold uppercase tracking-[0.28em] text-[0.6rem] mt-1">
        Campos
      </span>
    </span>
  );
}
