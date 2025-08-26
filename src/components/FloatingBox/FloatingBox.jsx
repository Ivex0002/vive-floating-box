import React, { useEffect, useRef, useState } from "react";
import "./FloatingBox.css";

/**
 * @typedef {Object} FloatingBoxProps
 * @property {import("react").ReactNode} children - your contents
 * @property {number} [moveRate=0.02] - mouse move response rate
 * @property {boolean} [isOn=true] 
 * @property {boolean} [onlyActiveHover=false] - actives only when this component in hover
 * @property {boolean} [useHoverScaleUp=true] - scale up when hover
 */

/**
 * FloatingBox 컴포넌트
 * @param {FloatingBoxProps} props
 */
export default function FloatingBox({
  children,
  moveRate = 0.02,
  isOn = true,
  onlyActiveHover = false,
  useHoverScaleUp = true,
}) {
  const boxRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const elementCenter = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!boxRef.current || !isOn) return;
    if (onlyActiveHover && !isHover) return;
    //   요소의 중심점
    const rect = boxRef.current.getBoundingClientRect();
    elementCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    let rafId = null;
    const handleMouseMove = (e) => {
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
      cancelAnimationFrame(rafId);
    };
  }, [moveRate, isOn, isHover]);

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
