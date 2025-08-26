import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./FloatingBox.css";

interface FloatingBoxProps {
  children: ReactNode;
  moveRate?: number;
  isOn?: boolean;
  onlyActiveHover?: boolean;
  useHoverScaleUp?: boolean;
}

export default function FloatingBox({
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
    //   요소의 중심점
    const rect = boxRef.current.getBoundingClientRect();
    elementCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        //   마우스와의 거리 계산
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
      className="box_move"
      ref={boxRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        if (boxRef.current && onlyActiveHover) {
          boxRef.current.style.transform = "translate(0, 0)";
        }
      }}
    >
      <div className={useHoverScaleUp ? "box_size" : ""}>{children}</div>
    </div>
  );
}
