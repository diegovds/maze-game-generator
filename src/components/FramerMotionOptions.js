const initial = { opacity: 0, scale: 0.5 };

const whileInView = { opacity: 1, scale: 1 };

const transition = {
  default: {
    duration: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
  },
  scale: {
    type: "spring",
    damping: 14,
    stiffness: 100,
    restDelta: 0.001,
  },
};

const container = {
  hidden: { y: 150, opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const leftItem = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const rightItem = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export {
  initial,
  whileInView,
  transition,
  container,
  item,
  leftItem,
  rightItem,
};
