export default a => {
  const points = [Array(25).fill(0), Array(25).fill(0)];
  const onboardCount = [0, 0];
  if (typeof a === "string") {
    a = a.split("/");
    a[0] = a[0]
      .split(",")
      .map(v => v.match(/(\d+|[^\d]+)/g))
      .map(([p, c, n = "1"]) => [
        parseInt(p, 10),
        c.toLowerCase() === "w" ? 0 : 1,
        parseInt(n, 10)
      ]);
    a[1] = a[1] ? a[1].toLowerCase() === "w" : 0;
    a[2] = a[2] ? a[2].split(",").map(i => parseInt(i, 10)) : [];
  }
  a[0].forEach(([position, color, count]) => {
    const p = color ? 25 - position : position;
    onboardCount[color] += count - points[color][p];
    points[color][p] = count;
  });
  onboardCount.forEach((v, color) => (points[color][25] = 15 - v));
  return { points, player: a[1], dice: a[2] };
};
