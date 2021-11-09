import gsap, { Power2 } from "gsap";

const getDefaultTimeline = (node, delay, original, dest) => {
  const timeline = gsap.timeline({ paused: true });
  timeline.set(node, { opacity: original });
  timeline.to(node, {
    opacity: dest,
    duration: 1.5,
    ease: Power2.easeInOut,
    delay: delay,
  });
  timeline.then(() => {
    console.log("Finished page transition animation");
  });
  return timeline;
};

export const playTransitionIn = (pathname, node) => {
  const delay = 1;
  const timeline = getDefaultTimeline(node, delay, 0, 1);
  timeline.play();
};

export const playTransitionOut = (pathname, node) => {
  const delay = 0;
  const timeline = getDefaultTimeline(node, delay, 1, 0);
  timeline.play();
};
