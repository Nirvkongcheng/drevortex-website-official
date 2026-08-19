"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// ── FadeIn: 滚动入场动画包装器 ──
type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className,
}: FadeInProps) {
  const MotionTag = motion.create(as as ElementType);
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// ── Magnet: 鼠标跟随磁性效果 ──
type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

export function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = rect.width / 2 + padding;
    if (dist < maxDist) {
      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      el.style.transition = activeTransition;
    } else {
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.transition = inactiveTransition;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
    el.style.transition = inactiveTransition;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ willChange: "transform", display: "inline-block" }}
    >
      {children}
    </div>
  );
}

// ── AnimatedText: 逐行滚动揭示动画 ──
type AnimatedTextProps = {
  text: string;
  className?: string;
};

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  // 按句末标点（。！？）切分成行，保留标点
  const lines = text.match(/[^。！？]+[。！？]?/g) ?? [text];

  return (
    <p ref={ref} className={className}>
      {lines.map((line, i) => (
        <LineSpan key={i} progress={scrollYProgress} index={i} total={lines.length}>
          {line}
        </LineSpan>
      ))}
    </p>
  );
}

function LineSpan({
  children,
  progress,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const filter = useTransform(progress, [start, end], ["blur(10px)", "blur(0px)"]);
  const y = useTransform(progress, [start, end], [12, 0]);
  return (
    <motion.span
      style={{ display: "block", opacity, filter, y }}
    >
      {children}
    </motion.span>
  );
}

// ── ContactButton: 渐变胶囊按钮 ──
export function ContactButton({ label = "联系我们" }: { label?: string }) {
  return (
    <button
      className="contact-btn"
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1, 0 0 0 2px white",
      }}
    >
      {label}
    </button>
  );
}

// ── LiveProjectButton: 幽灵轮廓按钮 ──
export function LiveProjectButton({ label = "查看详情" }: { label?: string }) {
  return <button className="live-project-btn">{label}</button>;
}
