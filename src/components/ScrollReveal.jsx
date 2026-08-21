import { motion } from 'framer-motion';

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
};

export default function ScrollReveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
  amount = 0.25,
}) {
  const Component = motion[as] ?? motion.div;
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
