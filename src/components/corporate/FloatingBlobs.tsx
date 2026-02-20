import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/* ──────────────────────────────────────────────────
   Page-level floating gradient blobs with parallax
   ────────────────────────────────────────────────── */

interface BlobConfig {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  color: string; // Tailwind bg class
  blur: string; // CSS blur value
  opacity: number;
  scrollSpeedY: number; // parallax multiplier (0 = fixed, higher = more movement)
  animationClass: string; // from index.css blob-animate-*
}

const BLOBS: BlobConfig[] = [
  {
    top: '-5%',
    left: '-8%',
    width: '700px',
    height: '700px',
    color: 'bg-orange-300/40',
    blur: '100px',
    opacity: 0.55,
    scrollSpeedY: 0.15,
    animationClass: 'blob-animate-slow',
  },
  {
    top: '12%',
    right: '-6%',
    width: '600px',
    height: '600px',
    color: 'bg-rose-300/35',
    blur: '90px',
    opacity: 0.45,
    scrollSpeedY: 0.25,
    animationClass: 'blob-animate-medium',
  },
  {
    top: '30%',
    left: '8%',
    width: '520px',
    height: '520px',
    color: 'bg-sky-300/30',
    blur: '85px',
    opacity: 0.4,
    scrollSpeedY: 0.1,
    animationClass: 'blob-animate-slow-delay',
  },
  {
    top: '48%',
    right: '3%',
    width: '560px',
    height: '560px',
    color: 'bg-violet-300/25',
    blur: '90px',
    opacity: 0.35,
    scrollSpeedY: 0.2,
    animationClass: 'blob-animate-medium-delay',
  },
  {
    top: '65%',
    left: '-4%',
    width: '480px',
    height: '480px',
    color: 'bg-teal-300/30',
    blur: '80px',
    opacity: 0.35,
    scrollSpeedY: 0.3,
    animationClass: 'blob-animate-fast',
  },
  {
    top: '82%',
    right: '10%',
    width: '440px',
    height: '440px',
    color: 'bg-amber-300/35',
    blur: '75px',
    opacity: 0.4,
    scrollSpeedY: 0.18,
    animationClass: 'blob-animate-slow',
  },
];

/* ──────────────────────────────────────────────────
   Individual blob with parallax scroll transform
   (separate component to respect React hooks rules)
   ────────────────────────────────────────────────── */
function FloatingBlobItem({
  config,
  scrollYProgress,
}: {
  config: BlobConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', `${config.scrollSpeedY * -400}px`],
  );

  return (
    <motion.div
      className={`absolute rounded-full ${config.color} ${config.animationClass}`}
      style={{
        top: config.top,
        left: config.left,
        right: config.right,
        width: config.width,
        height: config.height,
        filter: `blur(${config.blur})`,
        opacity: config.opacity,
        y,
      }}
    />
  );
}

/* ──────────────────────────────────────────────────
   FloatingBlobs — renders behind all page content
   ────────────────────────────────────────────────── */
export function FloatingBlobs() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <FloatingBlobItem
          key={i}
          config={blob}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
