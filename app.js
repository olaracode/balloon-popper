const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  "brown",
];

/**
 * @description crea un efecto de sonido al explotar un globo
 */
function soundEffect() {
  const audio = new Audio("pop.mp3");
  audio.play();
}

/**
 * @param {Event} event
 * @description oculta el globo que se le pasa como parametro
 * @returns void
 */
function pop(event) {
  const balloon = event.target;
}

/**
 * @description crea una lista de elementos html con la clase globo y un color aleatorio
 * @returns HTMLElement[]
 */
function createParty() {
  const balloons = [];
  for (let i = 0; i < 3; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const div = document.createElement("div");
    div.classList = "balloon";
    // change color to the before
    div.style.backgroundColor = color;
    div.style.color = color;
    balloons.push(div);
  }
  return balloons;
}

/**
 * @param {Number} count numero de globos que quedan
 * @description actualiza el contador de globos, si el contador es 0,
 * se ejecuta la animacion de confetti y se reinicia el juego
 * @returns void
 */
function setCounter(count) {
  const counter = document.querySelector("#counter");
  counter.innerText = count;
  if (count == 0) {
    confetti();
    const balloons = document.querySelector("#balloon-grid");
    balloons.classList = "";
    balloons.innerHTML =
      "<p>🎉 Felicidades explotaste todos los globos! 🎉</p>";
    balloons.style.textAlign = "center";
    setTimeout(() => {
      render();
    }, 3000);
  }
}

/**
 * @description Renderiza los globos en el DOM, crea el contador
 * y adjunta el evento click a los globos
 */
function render() {
  // seleccionamos el elemento con el id balloon-grid
  const balloonGrid = document.querySelector("#balloon-grid");

  // limpiamos el contenido del elemento
  balloonGrid.innerHTML = "";

  // le agregamos la clase balloon-grid
  balloonGrid.classList = "balloon-grid";

  // creamos todos los globos
  const balloons = createParty();

  // creamos la cuenta de globos
  let count = balloons.length;
  setCounter(count);

  // por cada globo le agregamos el evento click
  balloons.forEach((balloon) => {
    // creamos la funcion dentro del scope de la iteracion
    // para luego poder remover el evento
    const popBalloon = () => {
      balloon.style.visibility = "hidden";
      soundEffect();
      count--;
      setCounter(count);
      balloon.removeEventListener("click", popBalloon);
    };
    balloon.addEventListener("click", popBalloon);
    balloonGrid.appendChild(balloon);
  });
}

window.onload = render();
