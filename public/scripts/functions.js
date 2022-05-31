// Obtenga la URL actual, como: http: // localhost: 8083 / myproj / view / my.jsp
var curWwwPath = window.document.location.href;
// Obtenga el directorio después de la dirección de host, como: myproj / view / my.jsp
var pathName = window.document.location.pathname;
//obtenga posicion hasta donde empieza la path
var pos = curWwwPath.indexOf(pathName);
/* directorio raíz plugin */
var PROGDECO_RUTA =
  curWwwPath.substring(0, pos) + "/wp-content/plugins/program-decora";

var today = createDateString();
var ano = new Date().getFullYear();

if (
  new Date().getTime() > new Date(ano + "/12/21").getTime() &&
  new Date().getTime() < new Date(ano + 1 + "/01/07").getTime()
) {
  console.log("ya es navidad YUPI");
}

/* fall */
var fall_active = false;
var station;
var fallObjects = new Array();
/* activa decoración estación del año */
if (today === createDateString("03/20")) {
  //comienza primavera
  station = "primavera";
  fall_active = true;
} else if (today === createDateString("06/21")) {
  //comienza verano
  station = "estiu";
  fall_active = true;
} else if (today === createDateString("09/23")) {
  //comienza otonyo
  station = "tardor";
  fall_active = true;
} else if (today === createDateString("12/21")) {
  //comienza invierno
  station = "hivern";
  fall_active = true;
}

var numObjs = 20,
  waft = 50,
  fallSpeed = 10,
  wind = 0;
var objects = new Array(),
  winOffset = 0,
  winHeight,
  winWidth,
  togvis,
  moz = document.getElementById ? 1 : 0;

window.onload = function () {
  /* activa decoración dia de la dona */
  if (today === createDateString("03/08")) {
    changeColorHeader();
    changeColorFooter();
    addImg("8mar.svg", "Simbolo dia de la mujer");
  }
  if (fall_active) {
    newObject(PROGDECO_RUTA + "/public/img/" + station + "-1.svg", 30, 30);
    newObject(PROGDECO_RUTA + "/public/img/" + station + "-2.svg", 30, 30);
    newObject(PROGDECO_RUTA + "/public/img/" + station + "-3.svg", 30, 30);
    newObject(PROGDECO_RUTA + "/public/img/" + station + "-4.svg", 30, 30);
    /* Comprobando el ancho de la ventana y si es menor a 991px, establecerá el viento en 0 y el
        número de objetos entre 5 y 15. Si la ventana es mayor a 991px, establecerá el
        viento a un número aleatorio entre -2 y 2 y el número de objetos a caer entre 15 y 25. */
    if (window.innerWidth <= 991) {
      /* dirección recto */
      wind = 0;
      /* numero aleatorio de objetos a caer entre 5 y 15 */
      numObjs = getRndInteger(5, 10);
    } else {
      /* direccion aleatoria */
      wind = getRndInteger(-2, 2);
      /* numero aleatorio de objetos a caer entre 15 y 25 */
      numObjs = getRndInteger(15, 25);
    }
    winSize();
    for (i = 0; i < numObjs; i++) {
      fallObject(i, parseInt(Math.random() * fallObjects.length), 1);
    }
    window.onresize = winSize;
    fall();
  }
  /* Fa menut i gran la imatge insertada al header al fer scroll */
  window.onscroll = function () {
    //si existeix el DOM de la img nova (si hem insertat imatge)
    if (!!document.getElementById("img_new")) {
      // obtener la posición actual (eje Y)
      let scroll_actual = window.pageYOffset;
      //scroll que hem fet al header
      let header = document.getElementsByTagName("header")[0];
      let header_scroll = header.offsetTop;

      var img_new = document.getElementById("img_new");

      if (scroll_actual > header_scroll - 40) {
        img_new.classList.add("resize");
      } else {
        img_new.classList.remove("resize");
      }
    }
  };
};

/* ****** FUNCION FALL ******* */

/* numero random entre un minimo y un maximo */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* crear objetos a caer y su tamaño y lo mete en el array */
function newObject(url, height, width) {
  fallObjects[fallObjects.length] = new Array(url, height, width);
}

function winSize() {
  /* mida body */
  winWidth = document.body.scrollWidth;
  winHeight = document.body.scrollHeight;
}

/**
 * Crea una serie de objetos que caen desde la parte superior de la pantalla hasta la parte inferior.
 * @param num - el número del objeto
 * @param vari - El tipo de objeto a caer.
 * @param nu - número de objetos
 */
function fallObject(num, vari, nu) {
  /* Creando una matriz de objetos que caerán. */
  objects[num] = new Array(
    parseInt(Math.random() * (winWidth - waft)),
    -30,
    parseInt(Math.random() * waft) * (Math.random() > 0.5 ? 1 : -1),
    0.02 + Math.random() / 20,
    0,
    1 + parseInt(Math.random() * fallSpeed),
    vari,
    fallObjects[vari][1],
    fallObjects[vari][2]
  );
  /* Crear el elemento imagen */
  if (nu == 1) {
    let home = document.querySelector(".home");
    let site = document.querySelector(".site");
    var img = document.createElement("img");
    img.id = "fO" + i;
    img.style =
      "position:absolute;z-index:100100;background:none;border:0;padding:0;box-shadow:none; width: 30px; height: 30px;";
    img.src = fallObjects[vari][0];
    home.insertBefore(img, site);
  }
}

function fall() {
  for (i = 0; i < numObjs; i++) {
    var fallingObject = document.getElementById("fO" + i);
    /* Comprobando si el objeto está fuera de la pantalla. Si es así, llamará a la función fallObject() para
   crear un nuevo objeto. */
    if (
      objects[i][1] > winHeight - (objects[i][5] + objects[i][7]) ||
      objects[i][0] > winWidth - (objects[i][2] + objects[i][8])
    ) {
      fallObject(i, objects[i][6], 0);
    }
    /* Mover los objetos. */
    objects[i][0] += wind;
    objects[i][1] += objects[i][5];
    objects[i][4] += objects[i][3];
    /* Establecer las propiedades superior e izquierda del objeto fallsObject.style. */
    with (fallingObject.style) {
      top = objects[i][1] + winOffset + "px";
      left = objects[i][0] + objects[i][2] * Math.cos(objects[i][4]) + "px";
    }
  }
  //rapidez en caer
  setTimeout("fall()", 31);
}

/* ******* FUNCION FECHA ************* */
/**
 * Si la fecha es nula, cree un nuevo objeto de fecha; de lo contrario, cree un nuevo objeto de fecha con la fecha
 * aprobada en.
 * @param [fecha=null] - La fecha que desea formatear.
 * @returns Una cadena con la fecha en el formato "dd/mm"
 */
function createDateString(fecha = null) {
  let date;
  if (fecha == null) {
    date = new Date();
  } else {
    date = new Date(fecha);
  }
  return date.toLocaleDateString("es-ES", { month: "numeric", day: "numeric" });
}
/* ******** FUNCIÓN INSERTAR IMAGEN ********** */
/**
 * Crea un elemento de imagen, establece sus atributos src, alt, id y class, y luego lo agrega al
 * header al lado del nombre de la empresa
 * @param name: el nombre de la imagen que desea agregar.
 * @param alt: el atributo alt se usa para especificar un texto alternativo para una imagen, si la imagen
 * no se puede mostrar.
 * */
function addImg(name, alt) {
  let title = document.querySelector(".site-branding");
  let img = document.createElement("img");
  img.src = PROGDECO_RUTA + "/public/img/" + name;
  img.alt = alt;
  img.id = "img_new";
  img.class = "";
  title.appendChild(img);
}

/* *********** FUNCIONES 8 MARZO ************************ */

/* cambia de color el footer  */
function changeColorFooter() {
  let footer = document.getElementsByTagName("footer")[0];
  footer.style.backgroundImage =
    "url(" + PROGDECO_RUTA + "/public/img/wave_footer.svg)";
  footer.style.backgroundPositionY = "center";
  footer.classList.add("wave");
}

/* cambia de color el header */
function changeColorHeader() {
  let header = document.getElementsByTagName("header")[0];
  header.style.backgroundImage =
    "url(" + PROGDECO_RUTA + "/public/img/wave_header.svg)";
  header.style.backgroundPositionY = "bottom";
  header.classList.add("wave");
}
