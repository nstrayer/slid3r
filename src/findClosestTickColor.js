export default (tickData, finalPos) => {
  const closestTick = tickData.reduce(
    (closest, current, i) => {
      const distanceFromTick = Math.abs(finalPos - current.pos);
      return distanceFromTick < closest.distance || closest.distance === null
        ? { distance: distanceFromTick, index: i }
        : closest;
    },
    { distance: null, index: -1 }
  );

  return tickData[closestTick.index].color;
};
