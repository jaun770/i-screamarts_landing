import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allHeroArtworks } from '@/utils/heroArtworks';

/* ──────────────────────────────────────────────────
   Column-Pair SmileArc — ClassDojo style
   Each X-position holds TWO cards (top + bottom)
   that move together as a single column unit.
   ────────────────────────────────────────────────── */

// ── Desktop config ──
const COLS_DESKTOP            = 11;    // column count
const COL_SPACING_DESKTOP     = 168;   // px between column centers (wider = more airy)
const CONTAINER_WIDTH_DESKTOP = 1900;

const BOTTOM_W_DESKTOP = 152;          // bottom card width
const BOTTOM_H_DESKTOP = 158;          // fixed height — all columns identical
const TOP_W_DESKTOP    = 152;          // same width as bottom (uniform look)
const TOP_H_DESKTOP    = 126;          // fixed height — all columns identical

const ARC_DEPTH_DESKTOP    = 120;      // U-curve depth (center→edge Y difference)
const MAX_ROTATION_DESKTOP = 22;       // max tilt — inward toward center
const CARD_GAP             = 20;       // px between bottom and top card (more breathing room)

// ── Mobile config (<640px) ──
const COLS_MOBILE            = 9;
const COL_SPACING_MOBILE     = 110;
const CONTAINER_WIDTH_MOBILE = 1050;

const BOTTOM_W_MOBILE = 92;
const BOTTOM_H_MOBILE = 100;
const TOP_W_MOBILE    = 92;
const TOP_H_MOBILE    = 80;

const ARC_DEPTH_MOBILE    = 90;
const MAX_ROTATION_MOBILE = 18;

/* ──────────────────────────────────────────────────
   Arc position for each column (U-shape, center lowest)
   ────────────────────────────────────────────────── */
interface ColPos {
  xPx: number;     // px offset from container center
  yOffset: number; // px — how far this column rises (0 = center/lowest)
  rotation: number;// degrees — positive = clockwise (right side)
}

function computeColumnPositions(
  cols: number,
  spacing: number,
  depth: number,
  maxRotation: number,
): ColPos[] {
  const halfSpan = ((cols - 1) / 2) * spacing;
  return Array.from({ length: cols }, (_, i) => {
    const t = cols === 1 ? 0 : (2 * i) / (cols - 1) - 1; // -1 → +1
    return {
      xPx: t * halfSpan,
      yOffset: depth * t * t,    // parabola: 0 at center, depth at edges
      rotation: -t * maxRotation, // INWARD: cards lean toward center (healthy smile)
    };
  });
}

/* ──────────────────────────────────────────────────
   Fisher-Yates shuffle
   ────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ──────────────────────────────────────────────────
   ArtCard — single image slot with crossfade
   ────────────────────────────────────────────────── */
function ArtCard({
  imgSrc,
  width,
  height,
  language,
  hoverScale = 1.12,
}: {
  imgSrc: string;
  width: number;
  height: number;
  language: string;
  hoverScale?: number;
}) {
  return (
    <div
      className="group/card relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/60
                 transition-all duration-300 cursor-pointer
                 group-hover/card:shadow-2xl"
      style={{ width, height }}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={imgSrc}
          src={imgSrc}
          alt={language === 'ko' ? '학생 작품' : 'Student artwork'}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65 }}
          loading="lazy"
          draggable={false}
          style={{ transformOrigin: 'center center' }}
        />
      </AnimatePresence>
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/0 pointer-events-none"
        whileHover={{ scale: hoverScale, backgroundColor: 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   SmileArc — Column-Pair layout
   ────────────────────────────────────────────────── */
export function SmileArc({ language }: { language: string }) {
  // Responsive
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Pick config based on breakpoint
  const cols        = isMobile ? COLS_MOBILE            : COLS_DESKTOP;
  const colSpacing  = isMobile ? COL_SPACING_MOBILE     : COL_SPACING_DESKTOP;
  const containerW  = isMobile ? CONTAINER_WIDTH_MOBILE : CONTAINER_WIDTH_DESKTOP;
  const bottomW     = isMobile ? BOTTOM_W_MOBILE        : BOTTOM_W_DESKTOP;
  const bottomH     = isMobile ? BOTTOM_H_MOBILE        : BOTTOM_H_DESKTOP;
  const topW        = isMobile ? TOP_W_MOBILE           : TOP_W_DESKTOP;
  const topH        = isMobile ? TOP_H_MOBILE           : TOP_H_DESKTOP;
  const arcDepth    = isMobile ? ARC_DEPTH_MOBILE       : ARC_DEPTH_DESKTOP;
  const maxRotation = isMobile ? MAX_ROTATION_MOBILE    : MAX_ROTATION_DESKTOP;

  // Column arc positions
  const colPositions = useMemo(
    () => computeColumnPositions(cols, colSpacing, arcDepth, maxRotation),
    [cols, colSpacing, arcDepth, maxRotation],
  );

  // Shuffled pool
  const pool = useMemo(() => shuffle(allHeroArtworks), []);

  // Each column holds [bottomImgIdx, topImgIdx]
  const [colImages, setColImages] = useState<Array<[number, number]>>(() =>
    Array.from({ length: cols }, (_, i) => [
      (i * 2)     % pool.length,
      (i * 2 + 1) % pool.length,
    ]),
  );

  const nextRef = useRef(cols * 2);

  // Keep state in sync when `cols` changes (resize)
  useEffect(() => {
    setColImages(prev =>
      Array.from({ length: cols }, (_, i) =>
        i < prev.length
          ? prev[i]
          : [(nextRef.current++) % pool.length, (nextRef.current++) % pool.length],
      ),
    );
  }, [cols, pool.length]);

  // Cycling timers — bottom and top swap at different times
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let c = 0; c < cols; c++) {
      const baseDelay = 3000 + c * 450;
      const intervalMs = 4500 + Math.random() * 2000;

      // Bottom card swap
      const b1 = setTimeout(() => {
        swapBottom(c);
        const iv = setInterval(() => swapBottom(c), intervalMs);
        timers.push(iv as unknown as ReturnType<typeof setTimeout>);
      }, baseDelay);
      timers.push(b1);

      // Top card swap — offset by half an interval
      const t1 = setTimeout(() => {
        swapTop(c);
        const iv = setInterval(() => swapTop(c), intervalMs);
        timers.push(iv as unknown as ReturnType<typeof setTimeout>);
      }, baseDelay + intervalMs / 2);
      timers.push(t1);
    }

    return () => timers.forEach(t => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, pool.length]);

  function swapBottom(col: number) {
    setColImages(prev => {
      const next = prev.map(p => [...p] as [number, number]);
      next[col][0] = nextRef.current % pool.length;
      nextRef.current++;
      return next;
    });
  }

  function swapTop(col: number) {
    setColImages(prev => {
      const next = prev.map(p => [...p] as [number, number]);
      next[col][1] = nextRef.current % pool.length;
      nextRef.current++;
      return next;
    });
  }

  // Container height — fixed card sizes, no need for array max
  const colH      = bottomH + CARD_GAP + topH;
  // bottomPad: gap between container bottom and center column base
  const bottomPad  = 20;
  // topBuffer: space reserved above inner div for rotated columns that visually poke upward.
  // The inner div is pinned to bottom; topBuffer lifts the outer div's top edge upward.
  const topBuffer  = 112;
  // Total height = cards + arc rise + bottom pad + top buffer
  const containerH = colH + arcDepth + bottomPad + topBuffer;

  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ height: containerH }}
    >
      {/* Fixed-width inner container — pinned to bottom, clipped L/R only */}
      <div
        className="absolute left-1/2"
        style={{
          width: containerW,
          transform: 'translateX(-50%)',
          // height = everything BELOW the top buffer
          height: containerH - topBuffer,
          bottom: 0,
        }}
      >
        {colPositions.map((pos, col) => {
          const [bottomIdx, topIdx] = colImages[col] ?? [0, 1];

          // z-index: center columns in front
          const centerDist = Math.abs(col - (cols - 1) / 2);
          const zBase = cols - Math.round(centerDist);

          return (
            <div
              key={col}
              className="absolute group"
              style={{
                left:      `calc(50% + ${pos.xPx}px)`,
                bottom:    pos.yOffset + bottomPad,
                transform: `translateX(-50%) rotate(${pos.rotation}deg)`,
                zIndex:    zBase,
                // All columns same size (uniform grid feel)
                width:     bottomW,
                height:    bottomH + CARD_GAP + topH,
              }}
            >
              {/* ── Top card (sits above bottom card) ── */}
              <div
                className="absolute left-1/2"
                style={{
                  bottom:    bottomH + CARD_GAP,
                  transform: 'translateX(-50%)',
                  zIndex:    1,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.13, y: -6, zIndex: 99 }}
                  transition={{ duration: 0.22 }}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <ArtCard
                    imgSrc={pool[topIdx]}
                    width={topW}
                    height={topH}
                    language={language}
                  />
                </motion.div>
              </div>

              {/* ── Bottom card (sits at column base) ── */}
              <div
                className="absolute left-1/2"
                style={{
                  bottom:    0,
                  transform: 'translateX(-50%)',
                  zIndex:    2,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.13, y: -6, zIndex: 99 }}
                  transition={{ duration: 0.22 }}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <ArtCard
                    imgSrc={pool[bottomIdx]}
                    width={bottomW}
                    height={bottomH}
                    language={language}
                    hoverScale={1.0}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
