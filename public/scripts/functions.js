window.onload = function () {
  changeColor();
  addImg();
};

window.onscroll = function () {
  if (!!document.getElementById("dona")) {
    // obtener la posición actual (eje Y)
    let scroll_actual = window.pageYOffset;
    //scroll que hem fet al header
    let header = document.getElementById("masthead");
    let header_scroll = header.offsetTop;

    var img_dona = document.getElementById("dona");

    if (scroll_actual > header_scroll - 40) {
      img_dona.classList.add("resize");
    } else {
      img_dona.classList.remove("resize");
    }
  }
};

// Obtenga la URL actual, como: http: // localhost: 8083 / myproj / view / my.jsp
var curWwwPath = window.document.location.href;
// Obtenga el directorio después de la dirección de host, como: myproj / view / my.jsp
var pathName = window.document.location.pathname;
//obtenga posicion hasta donde empieza la path
var pos = curWwwPath.indexOf(pathName);
/* directorio raíz plugin */
var PROGDECO_RUTA =
  curWwwPath.substring(0, pos) + "/wp-content/plugins/program-decora";

/* cambia de color el header y footer */
function changeColor() {
  let header = document.getElementById("masthead");
  let footer = document.getElementById("colophon");
  header.style.backgroundColor = "#d6d2e7";
  footer.style.backgroundColor = "#d6d2e7";
}

/* insertar imatge dia de la dona */
function addImg() {
  let title = document.querySelector(".site-branding");
  let img = document.createElement("img");
  img.src = PROGDECO_RUTA + "/public/img/8mar.svg";
  img.alt = "simbolo dia de la mujer";
  img.id = "dona";
  img.class = "";
  title.appendChild(img);
}
