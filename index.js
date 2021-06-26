let startBtn = document.getElementById("startBtn");
let initialVelocity = 50;
let angle = 30; // in degrees;
const gravity = 9.8;

let angle = document.getElementById("angle");
let velocity = document.getElementById("velocity");

let timeInSeconds = 0;
let intervalId = null;

JSC.Chart('chartDiv', {});

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

// angle.addEventListener("input", function (event) {
//     document.getElementById("angleVal").nodeValue = event.value
//   });


function startProjectile() {
  //Reset any previous movement.
  resetTimer();
  //Start new one and make it run every 1 second.
  startMovement();
  intervalId = setInterval(startMovement, 1000);
}

function startMovement() {
//   var c = document.getElementById("myCanvas");
//   var ctx = c.getContext("2d");

//   // Create gradient
//   var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
//   grd.addColorStop(0, "red");
//   grd.addColorStop(1, "white");

//   // Fill with gradient
//   ctx.fillStyle = grd;
//   ctx.fillRect(10, 10, 150, 80);

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
