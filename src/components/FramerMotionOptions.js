const initial = { opacity: 0, scale: 0.5 };

const whileInView = { opacity: 1, scale: 1 };

const transition = {
  duration: 0.2,
  ease: "easeOut",
  delay: 0.25,
};

const cardAnimate = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.5,
    },
  },
};

const imageAnimate = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    /*rotate: [0, 10, 0],*/
    transition: { type: "spring", bounce: 0.4, duration: 1 },
  },
};

const textAnimate = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: [0, -10, 0],
    transition: { type: "spring", bounce: 0.4, duration: 1 },
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
  cardAnimate,
  imageAnimate,
  textAnimate,
};
