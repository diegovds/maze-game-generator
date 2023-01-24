const initial = { opacity: 0, scale: 0.5 };

const whileInView = { opacity: 1, scale: 1 };

const transition = { duration: 0.8, delay: 0.25, ease: [0, 0.71, 0.2, 1.01] };

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
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const rightItem = {
  hidden: { x: 20, opacity: 0 },
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
