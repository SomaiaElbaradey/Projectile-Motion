let startBtn = document.getElementById("startBtn");
let initialVelocity = 50;
let angle = 30; // in degrees;
const gravity = 9.8;

let timeInSeconds = 0;
let intervalId = null;

let initialYVelocity = function (initialV = initialVelocity, theta = angle) {
  return initialV * Math.sin(toRadians(theta));
};

let timeOfFlight = function () {
  return (2 * initialYVelocity()) / gravity;
};

let xVelocity = function (initialV = initialVelocity, theta = angle) {
  return initialV * Math.cos(toRadians(theta));
};
let yVelocity = function (time = timeInSeconds) {
  return initialYVelocity() - gravity * time;
};

let xDisplacement = function (time = timeInSeconds) {
  return xVelocity() * time;
};
let yDisplacement = function (time = timeInSeconds) {
  return (
    initialVelocity * Math.sin(toRadians(angle)) * time -
    0.5 * gravity * Math.pow(time, 2)
  );
};

function startProjectile() {
  //Reset any previous movement.
  resetTimer();
  //Start new one and make it run every 1 second.
  startMovement();
  intervalId = setInterval(startMovement, 1000);
}

function startMovement() {
  if (timeInSeconds > timeOfFlight()) {
    let flightTime = timeOfFlight();
    console.log(
      `at time (${flightTime})sec: Vx(constant)=${xVelocity()}, Vy=${yVelocity(
        flightTime
      )}, x=${xDisplacement(flightTime)}, y=${yDisplacement(flightTime)}`
    );
    resetTimer();
    return;
  }

  console.log(
    `at time (${timeInSeconds})sec: Vx(constant)=${xVelocity()}, Vy=${yVelocity()}, x=${xDisplacement()}, y=${yDisplacement()}`
  );
  timeInSeconds += 1;
}

startBtn.addEventListener("click", function (event) {
  startProjectile();
});

function resetTimer() {
  timeInSeconds = 0;
  intervalId != null ? clearInterval(intervalId) : null;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
