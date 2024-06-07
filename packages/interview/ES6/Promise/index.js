async function sleep(func, duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      func();
      resolve();
    }, duration);
  });
}
function red() {
  console.log("red");
}

function yellow() {
  console.log("yellow");
}

function green() {
  console.log("green");
}
async function trafficLigit() {
  await sleep(red, 3000);
  await sleep(yellow, 2000);
  await sleep(green, 1000);

  trafficLigit();
}
trafficLigit();
