import { ReactNode, useEffect, useRef, useState } from "react";

type FloatingBoxProps = {
  children: ReactNode;
  moveRate?: number;
  isOn?: boolean;
  onlyActiveHover?: boolean;
  useHoverScaleUp?: boolean;
};

export function FloatingBox({
  children,
  moveRate = 0.02,
  isOn = true,
  onlyActiveHover = false,
  useHoverScaleUp = true,
}: FloatingBoxProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const elementCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!boxRef.current || !isOn) return;
    if (onlyActiveHover && !isHover) return;
    const rect = boxRef.current.getBoundingClientRect();
    elementCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const dx = elementCenter.current.x - e.clientX;
        const dy = elementCenter.current.y - e.clientY;

        if (boxRef.current) {
          boxRef.current.style.transform = `translate(${dx * moveRate}px, ${
            dy * moveRate
          }px)`;
        }

        rafId = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [moveRate, isOn, isHover, onlyActiveHover]);

  return (
    <div
      ref={boxRef}
      style={{
        position: "relative",
        zIndex: 999,
        willChange: "transform",
        width: "fit-content",
        height: "fit-content",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        if (boxRef.current && onlyActiveHover) {
          boxRef.current.style.transform = "translate(0, 0)";
        }
      }}
    >
      <div
        style={
          useHoverScaleUp
            ? {
                transition: "transform 0.35s cubic-bezier(0.7, -0.5, 0.4, 1.5)",
                transform: isHover ? "scale(1.13)" : "scale(1)",
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
