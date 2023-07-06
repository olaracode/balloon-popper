# Solución 💯

> Las funciones estan documentadas con [JSdoc](https://jsdoc.app/about-getting-started.html)

## Contenido

- [Crear los globos](#crear-los-globos-)
- [Agregar los globos a la grilla](#agregar-los-globos-a-la-grilla-)
- [Eliminar los globos](#eliminar-los-globos-)
- [Contador de globos](#contador-de-globos-)
- [Efecto de sonido](#efecto-de-sonido-)
- [Mensaje de felicitaciones](#mensaje-de-felicitaciones-)

## Crear los globos 🎈

El primer paso es crear nuestra lista de colores de los cuales vamos a escoger al crear los globos

```js
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
```

Luego vamos a crear una funcion que nos permita crear una lista de globos con un numero determinado de globos

```js
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
```

## Agregar los globos a la grilla 🎈🎈🎈🎈

Vamos a crear una funcion denominada render que es la que se va a encargar de cargar nuestro juego al DOM, por ahora solamente vamos a crear los globos y agregarlos a la grilla de html

```js
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
  balloons.forEach((balloon) => {
    balloonGrid.appendChild(balloon);
  });
}

window.onload = render();
```

## Eliminar los globos 💥

Dentro del forEach de render vamos a crear una funcion que se encargue de eliminar los globos al hacer click en ellos

```js
function render() {
  // ...
  balloons.forEach((balloon) => {
    const popBalloon = () => {
      balloon.style.visibility = "hidden";
      balloon.removeEventListener("click", popBalloon);
    };
    balloon.addEventListener("click", popBalloon);
    balloonGrid.appendChild(balloon);
  });
  // ...
```

Nuestro forEach ahora hace, linea por linea

- Declaramos una funcion que se encargue de eliminar el globo

  - Ocultamos el globo
  - Eliminamos el evento click del globo

- Agregamos el evento click al globo
- Agregamos el globo al DOM

## Contador de globos 🔢

Para crear el contador primero vamos a declarar una variable count dentro de la funcion render

```js
function render() {
  //...
  const balloons = createParty();
  let count = balloons.length;
}
```

Luego vamos a crear una funcion que se encargue de actualizar el contador

```js
/**
 * @param {Number} count numero de globos que quedan
 * @description actualiza el contador de globos
 * @returns void
 */
function setCounter(count) {
  const counter = document.querySelector("#counter");
  counter.innerText = count;
}
```

Y por ultimo vamos a llamar a la funcion setCounter dentro de la funcion popBalloon

```js
//... render()
const popBalloon = () => {
  balloon.style.visibility = "hidden";
  balloon.removeEventListener("click", popBalloon);

  // COUNTER
  count--;
  setCounter(count);
};
//...
```

## Efecto de sonido 🔉💥

Para agregar el efecto de sonido vamos a crear una funcion que se encargue de reproducir el sonido

```js
/**
 * @description reproduce el sonido de explosion
 * @returns void
 */
function playSound() {
  const audio = new Audio("pop.mp3");
  audio.play();
}
```

Y agregamos la funcion playSound dentro de la funcion popBalloon

```js
//...
const popBalloon = () => {
  balloon.style.visibility = "hidden";
  balloon.removeEventListener("click", popBalloon);
  // SONIDO
  playSound();
  // COUNTER
  count--;
  setCounter(count);
};
//...
```

## Mensaje de felicitaciones 🎉

Para crear el mensaje de felicitaciones vamos a actualizar nuestra funcion de contador

Primero validamos si el contador es 0, si es 0 vamos a felicitar al usuario y a reiniciar el juego

Para felicitar al usuario vamos a seleccionar la grilla de globos, vamos a eliminar la clase que aplica la grilla y vamos a agregar un mensaje de felicitaciones, tambien podemos centrar el texto usando element.style...

Para reiniciar el juego vamos a utilizar la funcion setTimeout que nos permite ejecutar una funcion despues de un tiempo determinado, 1000 = 1s

```js
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
```

## Efecto de confetti

Para crear el efecto de confetti vamos a utilizar la libreria [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

Esta libreria ya esta agregada via CDN en el index.html

Para utilizarla solamente tenemos que agregar la linea de codigo que nos indica la documentacion

```js
//... setCounter()
if (count == 0) {
  confetti();
  //...
}
//...
```
