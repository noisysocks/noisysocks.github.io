import {
  setSpeed,
  enableDynamicSpeed,
  disableDynamicSpeed,
} from "./stripes.js";

const CRAZY_SPEED = 1000;

function disassociate() {
  disableDynamicSpeed();
  setSpeed(CRAZY_SPEED);
  document.querySelectorAll("*").forEach((element) => {
    element.classList.add("disassociate");
  });
}

function reassociate() {
  enableDynamicSpeed();
  document.querySelectorAll(".disassociate").forEach((element) => {
    element.classList.remove("disassociate");
  });
}

let isDisassociated = false;
document.getElementById("do-not-press").addEventListener("click", () => {
  isDisassociated = !isDisassociated;
  isDisassociated ? disassociate() : reassociate();
});
