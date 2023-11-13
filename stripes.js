const GAP_HEIGHT = 60;
const STRIPE_HEIGHT = 60;
const GAP_FILL = "#d400ff";
const STRIPE_FILL = "#ffd400";
const MIN_SPEED = 10;
const MAX_SPEED = 100;

const canvas = document.getElementById("stripes");
const ctx = canvas.getContext("2d");

let speed = MIN_SPEED;
let prevTime = Date.now();
let offset = 0;

function paint() {
  const time = Date.now();
  const delta = (time - prevTime) / 1000;
  prevTime = time;

  offset += speed * delta;
  offset = offset % (GAP_HEIGHT + STRIPE_HEIGHT);

  const numStripes = Math.ceil(canvas.height / (GAP_HEIGHT + STRIPE_HEIGHT));
  for (let i = -1; i < numStripes; i++) {
    const y = i * (GAP_HEIGHT + STRIPE_HEIGHT) + offset;
    ctx.fillStyle = STRIPE_FILL;
    ctx.fillRect(0, y, canvas.width, STRIPE_HEIGHT);
    ctx.fillStyle = GAP_FILL;
    ctx.fillRect(0, y + STRIPE_HEIGHT, canvas.height, GAP_HEIGHT);
  }

  requestAnimationFrame(paint);
}

requestAnimationFrame(paint);

function resizeCanvas() {
  const isMobile = window.innerWidth < 600;
  canvas.width = window.innerWidth * (isMobile ? 0.1 : 0.25);
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

export function setSpeed(newSpeed) {
  speed = newSpeed;
}

function handleMouseMove(event) {
  setSpeed(
    (event.clientX / window.innerWidth) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED
  );
}

export function enableDynamicSpeed() {
  setSpeed(MIN_SPEED);
  document.addEventListener("mousemove", handleMouseMove);
}

export function disableDynamicSpeed() {
  document.removeEventListener("mousemove", handleMouseMove);
}

enableDynamicSpeed();
