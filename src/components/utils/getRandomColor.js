const circleColors = ["green", "pink", "orange", "blue"];
export default function getRandomColor() {
  return circleColors[Math.floor(Math.random() * circleColors.length)];
}
