let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let velocity = document.getElementById("velocity");
let angle = document.getElementById("angle");
let velocityNumber = document.getElementById("velocityNumber");
let angleNumber = document.getElementById("angleNumber");
let initialVelocity = velocity.value;
let initialAngle = angle.value;
let chart;
let timeInSeconds = 0;
let intervalId = null;
const gravity = 9.8;

//initialize the chart
window.onload = function () {
  chart = new CanvasJS.Chart("motionChart", {
    backgroundColor: "#0000",
    axisX: {
      title: "X Axis",
      titleFontColor: "#ffff",
      lineColor: "#369EAD",
    },
    axisY: {
      title: "Y Axis",
      titleFontColor: "#ffff",
      lineColor: "#369EAD",
    },
    title: {
      text: "Trajectory",
      fontColor: "#ffff",
    },
    animationEnabled: true,
    data: [
      {
        type: "line",
        dataPoints: [],
      },
    ],
  });
  chart.render();
};

let addPoint = function (xPoint, yPoint) {
  chart.data[0].addTo("dataPoints", { x: xPoint, y: yPoint });
};

let initialYVelocity = function (
  initialV = initialVelocity,
  theta = initialAngle
) {
  return initialV * Math.sin(toRadians(theta));
};

let timeOfFlight = function () {
  return (2 * initialYVelocity()) / gravity;
};

let xVelocity = function (initialV = initialVelocity, theta = initialAngle) {
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
    initialVelocity * Math.sin(toRadians(initialAngle)) * time -
    0.5 * gravity * Math.pow(time, 2)
  );
};

function startProjectile() {
  //Reset any previous movement.
  resetTimer();
  //Start new one and make it run every 0.5 second.
  startMovement();
  intervalId = setInterval(startMovement, 500);
}

function startMovement() {
  if (timeInSeconds > timeOfFlight()) {
    let flightTime = timeOfFlight();
    addPoint(xDisplacement(flightTime), 0);
    console.log(
      `at time (${flightTime})sec: Vx(constant)=${xVelocity()}, Vy=${yVelocity(
        flightTime
      )}, x=${xDisplacement(flightTime)}, y=${yDisplacement(flightTime)}`
    );
    resetTimer();
    return;
  }
  addPoint(xDisplacement(), yDisplacement());

  console.log(
    `at time (${timeInSeconds})sec: Vx(constant)=${xVelocity()}, Vy=${yVelocity()}, x=${xDisplacement()}, y=${yDisplacement()}`
  );
  timeInSeconds += 0.5;
}

startBtn.addEventListener("click", function () {
  chart.data[0].set("dataPoints", []);
  initialVelocity = velocity.value;
  initialAngle = angle.value;
  startProjectile();
});

restartBtn.addEventListener("click", function () {
  velocity.value = 50;
  angle.value = 45;
  angleNumber.innerText = angle.value;
  velocityNumber.innerText = velocity.value;
  chart.data[0].set("dataPoints", []);
});

function resetTimer() {
  timeInSeconds = 0;
  intervalId != null ? clearInterval(intervalId) : null;
}

function toRadians(initialAngle) {
  return initialAngle * (Math.PI / 180);
}
