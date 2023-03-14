const blurMax = 25;
let blur = blurMax;
const numVidasMax = 4;
let numVidas = numVidasMax;
let aciertosCount = 0;
let numerosRepetidos = [];
const momos = [
  { nombre: 'Algo anda mal', imagen: 'algo_anda_mal.jpg' },
  { nombre: 'Cielos que macizo', imagen: 'cielos_que_macizo.jpg' },
  { nombre: 'Cielos randy que huevos', imagen: 'cielos_randy_que_huevos.jpg' },
  { nombre: 'Eso no me lo esperaba', imagen: 'eso_no_me_lo_esperaba.jpg' },
  { nombre: 'Esponja enloqueciste', imagen: 'esponja_enloqueciste.jpg' },
  { nombre: 'La decepción, la traición hermano', imagen: 'la_decepcion.jpg' },
  { nombre: 'Lo harías por una scoobygalleta?', imagen: 'lo_harias_por_una_scoobygalleta.jpg' },
  { nombre: 'Los modales hacen al hombre', imagen: 'los_modales.jpg' },
  { nombre: 'Matematicas hijo', imagen: 'matematicas_hijo.jpg' },
  { nombre: 'No lo sé, Rick', imagen: 'no_lo_se_rick.jpg' },
  { nombre: 'Oh no mis lentes de contacto', imagen: 'lentes_de_conacto.jpg' },
  { nombre: 'Oye Parker estás demente', imagen: 'oye_parker.jpg' },
  { nombre: 'Parece que no pudo soportar el estilo Neutrón', imagen: 'estilo_neutron.jpg' },
  { nombre: 'Pelea de inválidos', imagen: 'pelea_de_invalidos.jpg' },
  { nombre: 'Puta que ofertón', imagen: 'puta_que_oferton.jpg' },
  { nombre: 'Que buen servicio', imagen: 'que_buen_servicio.jpg' },
  { nombre: 'Qué truzaco, no?', imagen: 'que_trucazo_no.jpg' },
  { nombre: 'Son exepertos, Bob, expertos!', imagen: 'son_expertos.jpg' },
  { nombre: 'Sullivan, dame a la niña', imagen: 'sullivan_dame_a_la_nina.jpg' },
  { nombre: 'Sustos que dan gusto', imagen: 'sustos_que_dan_gusto.jpg' },
  { nombre: 'Tengo miedo', imagen: 'tengo_miedo.jpg' },
  { nombre: 'Tienes mi respeto, Stark', imagen: 'tienes_mi_respeto_stark.jpg' },
  { nombre: 'Yo por ahí no paso', imagen: 'yo_por_ahi_no_paso.jpg' }
];

function quitarCensura() {
  const imagen = document.querySelector("img");
  imagen.style.filter = "blur(0px)";
}
function quitarCensuraParcial() {
  const imagen = document.querySelector("img");
  if (blur == blurMax) {
    blur -= 10;
  } else {
    blur -= 5;
  }
  imagen.style.filter = `blur(${blur}px)`;
}

function numeroSinRepetir(max, previousNumbers) {
  let randomNumber = Math.floor(Math.random() * max);
  while (previousNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * max);
  }
  previousNumbers.push(randomNumber);
  return randomNumber;
}
document.addEventListener('DOMContentLoaded', () => {
  function nuevoMomo() {

    let numRandom = numeroSinRepetir(momos.length, numerosRepetidos);
    momoRandom = momos[numRandom];
    const game = document.getElementById('game');
    const imagen = document.createElement('img');
    imagen.setAttribute("id", "imagen");
    imagen.src = `images/${momoRandom.imagen}`;
    imagen.style.filter = `blur(${blur}px)`;
    imagen.style.pointerEvents = 'none';
    game.insertAdjacentElement('afterbegin', imagen);
    return momoRandom;
  }
  let momoElegido = nuevoMomo();

  const select = document.createElement('select');
  const botonAdivinar = document.createElement('button');
  const botonNext = document.createElement('button');
  const aciertos = document.createElement('h2');
  const feedback = document.createElement('h2');
  const vidas = document.getElementById('vidas');
  const defaultOption = document.createElement('option');
  select.setAttribute("id", "select");
  defaultOption.textContent = 'Seleccionar momo';
  defaultOption.selected = true;
  defaultOption.disabled = true;
  vidas.innerText = `Vidas: ❤️❤️❤️❤️`;
  botonAdivinar.innerText = "Adivinar";
  aciertos.innerText = aciertosCount;
  aciertos.style.textAlign = "center";
  botonNext.innerText = "NEXT";
  botonNext.style.display = "none";
  feedback.style.display = "none";
  feedback.style.color = "white";

  game.insertAdjacentElement('beforeend', aciertos);
  game.insertAdjacentElement('beforeend', select);
  game.insertAdjacentElement('beforeend', botonAdivinar);
  game.insertAdjacentElement('beforeend', botonNext);
  game.insertAdjacentElement('beforeend', feedback);
  select.appendChild(defaultOption);

  momos.forEach(momo => {
    const option = document.createElement('option');
    option.value = momo.nombre;
    option.textContent = momo.nombre;
    select.appendChild(option);
  });

  function deshabilitarBotones() {
    select.disabled = true;
    botonAdivinar.disabled = true;
    select.style.cursor = "not-allowed";
    botonAdivinar.style.cursor = "not-allowed";
  }

  function habilitarBotones() {
    select.disabled = false;
    botonAdivinar.disabled = false;
    select.style.cursor = "pointer";
    botonAdivinar.style.cursor = "pointer";
  }

  botonNext.addEventListener('click', () => {
    botonNext.style.display = "none";
    let imagen = document.getElementById('imagen');
    game.removeChild(imagen);
    habilitarBotones();
    momoElegido = nuevoMomo();
    select.value = 'Seleccionar momo';
  });

  botonAdivinar.addEventListener('click', () => {
    const nombreSelect = select.value;
    if (momoElegido.nombre === nombreSelect) {
      aciertosCount++;
      aciertos.innerText = aciertosCount;
      quitarCensura();
      deshabilitarBotones();
      if (aciertosCount == momos.length) {
        feedback.innerText = "Felicidades, eres un momero de verdad";
        feedback.style.display = "flex";
        imagen.src = `images/victoria.jpg`;
      } else {
        blur = blurMax;
        botonNext.style.display = "initial";
      }
    } else {
      quitarCensuraParcial();
      numVidas--;
      switch (numVidas) {
        case 3:
          vidas.innerText = `Vidas: ❤️❤️❤️🖤`;
          break;
        case 2:
          vidas.innerText = `Vidas: ❤️❤️🖤🖤`;
          break;
        case 1:
          vidas.innerText = `Vidas: ❤️🖤🖤🖤`;
          break;
        case 0:
          vidas.innerText = `Vidas: 🖤🖤🖤🖤`;
          feedback.innerText = "No eres lo suficiente momero para jugar";
          feedback.style.display = "flex";
          deshabilitarBotones();
          break;
      }
    }
  });
});