/**
 * FloatingCard3D.jsx
 * A CSS-3D perspective tilt wrapper that follows the mouse/touch.
 * No Three.js overhead — uses native CSS transforms for peak performance.
 * Wrap any child to make it feel like a physical card floating in 3D space.
 */
import { useRef, useCallback } from "react";

export default function FloatingCard3D({
  children,
  className = "",
  intensity = 8,      // max tilt in degrees
  glare = true,       // subtle specular glare overlay
}) {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;

      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;

      // Client coords (support both mouse and touch)
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = (clientX - cx) / (rect.width  / 2);   // -1 … +1
      const dy = (clientY - cy) / (rect.height / 2);   // -1 … +1

      const rotY =  dx * intensity;
      const rotX = -dy * intensity;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;

      if (glareRef.current) {
        // Glare angle follows pointer
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        const dist  = Math.min(1, Math.hypot(dx, dy));
        glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${dist * 0.18}) 0%, transparent 70%)`;
        glareRef.current.style.opacity = "1";
      }
    },
    [intensity, glare]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-panel opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
