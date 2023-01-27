const initial = { opacity: 0 };

const whileInView = { opacity: 1 };

const transition = {
  duration: 1,
  ease: [0.5, 0, 0, 1],
  delay: 0.25,
};

const cardAnimate = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
      delayChildren: 0.3,
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

export {
  initial,
  whileInView,
  transition,
  container,
  item,
  cardAnimate,
  imageAnimate,
  textAnimate,
};
