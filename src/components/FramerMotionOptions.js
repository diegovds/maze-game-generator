const initial = { opacity: 0 };

const whileInView = { opacity: 1 };

const transition = {
  duration: 1,
  ease: [0.5, 0, 0, 1],
  delay: 0.25,
};

const cardAnimate = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeIn",
      delay: 0.25,
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
  hidden: { opacity: 0 },
};

const imageAnimate = {
  visible: { opacity: 1, y: "0vh", transition: { duration: 0.4 } },
  hidden: { opacity: 0, y: "-10vh" },
};

const cardAnimateText = {
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  hidden: { opacity: 0 },
};

const textAnimate = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: "10%" },
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
  cardAnimateText,
};
