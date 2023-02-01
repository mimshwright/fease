import { reflectY } from "../decorator";

// TODO: cleanup, memoize and other optimization

const quadratic = (a: number, b: number, c: number) =>
  (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

const _getInstantaneousV = (G: number) => (v0: number) => (t: number) =>
  -v0 + G * t;
const _getBounceTime = (G: number) => (v0: number) => (y0: number) =>
  quadratic(-0.5 * G, v0, y0);
const _getPosition =
  (G: number) => (v0: number) => (y0: number) => (t: number) =>
    -0.5 * G * t ** 2 + v0 * t + y0;

const THRESH = 0.005;
const physics = (G: number) => (_rho: number) => {
  let recursions = 0;
  const GPos = Math.abs(G * 10);
  const rho = Math.max(_rho, 0);

  const getInstantaneousV = _getInstantaneousV(GPos);
  const getBounceTime = _getBounceTime(GPos);
  const getPosition = _getPosition(GPos);
  const doPhysics =
    (v0: number) =>
    (y0: number) =>
    (t: number): number => {
      if (v0 + y0 < THRESH) {
        recursions = 0;
        return 0;
      }
      if (recursions >= 20) {
        recursions = 0;
        return 0;
      }
      const bounceT = getBounceTime(v0)(y0);
      if (t > bounceT) {
        const vi = getInstantaneousV(v0)(bounceT) * rho;

        recursions += 1;
        return doPhysics(vi)(0)(t - bounceT);
      }
      recursions = 0;
      const result = getPosition(v0)(y0)(t);
      return result;
    };
  return doPhysics;
};

export const bounce = (gravity: number) => (bounciness: number) =>
  reflectY(physics(gravity)(bounciness)(0)(1));
