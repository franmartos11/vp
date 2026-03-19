// Animation variants for Framer Motion - Swiss Style aesthetics
// Principle: Subtle, deliberate, efficient. No bounce, no spring oscillation.
// Easing: exponential-out (fast start, graceful deceleration)

import type { Variants } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// Page transition - cross-fade with subtle vertical shift
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EXPO_OUT },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
  },
};

// Fade up — used for scroll-triggered section reveals
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EXPO_OUT },
  },
};

// Fade in — used for images/overlays
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Stagger container — applies stagger to child animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger — for line reveals and tight grids
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// Slide in from side — for nav items, labels
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EXPO_OUT },
  },
};

// Hero reveal — slow, majestic
export const heroReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EXPO_OUT },
  },
};

// Card hover — lift effect
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: EXPO_OUT } },
  hover: { y: -6, transition: { duration: 0.4, ease: EXPO_OUT } },
};

// Image overlay — portfolio cards
export const imageOverlay: Variants = {
  rest: { opacity: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// Text slide up — for card overlays
export const textSlideUp: Variants = {
  rest: { y: 12, opacity: 0, transition: { duration: 0.4, ease: EXPO_OUT } },
  hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: EXPO_OUT } },
};

// Default viewport config for useInView / whileInView
export const viewportConfig = {
  once: true,
  margin: "-60px" as `${number}px ${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px` | `${number}px`,
};
