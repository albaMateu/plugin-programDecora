var fallObjects = new Array();

function newObject(url, height, width) {
  fallObjects[fallObjects.length] = new Array(url, height, width);
}
var numObjs = 20,
  waft = 50,
  fallSpeed = 10,
  wind = 0;
newObject(
  "http://2.bp.blogspot.com/--fII5xz-9vY/UM-djWHHwgI/AAAAAAAABrI/tEKS6_ctv_k/s400/nieve2_jessi_diyva.png",
  22,
  22
);
newObject(
  "http://3.bp.blogspot.com/-DPHwVIctTlg/UM-di9jKOiI/AAAAAAAABq8/wV567ynxL2U/s400/nieve1_jessi_diyva.png",
  22,
  22
);

function winSize() {
  winWidth = moz ? window.innerWidth - 180 : document.body.clientWidth - 180;
  winHeight = moz ? window.innerHeight + 500 : document.body.clientHeight + 500;
}

function winOfy() {
  winOffset = moz ? window.pageYOffset : document.body.scrollTop;
}

function fallObject(num, vari, nu) {
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
  if (nu == 1) {
    document.write(
      '<img id="fO' +
        i +
        '" style="position:fixed;" src="' +
        fallObjects[vari][0] +
        '">'
    );
  }
}

function fall() {
  for (i = 0; i < numObjs; i++) {
    var fallingObject = document.getElementById("fO" + i);
    if (
      objects[i][1] > winHeight - (objects[i][5] + objects[i][7]) ||
      objects[i][0] > winWidth - (objects[i][2] + objects[i][8])
    ) {
      fallObject(i, objects[i][6], 0);
    }
    objects[i][0] += wind;
    objects[i][1] += objects[i][5];
    objects[i][4] += objects[i][3];
    with (fallingObject.style) {
      top = objects[i][1] + winOffset + "px";
      left = objects[i][0] + objects[i][2] * Math.cos(objects[i][4]) + "px";
    }
  }
  setTimeout("fall()", 31);
}
var objects = new Array(),
  winOffset = 0,
  winHeight,
  winWidth,
  togvis,
  moz = document.getElementById && !document.all ? 1 : 0;
winSize();
for (i = 0; i < numObjs; i++) {
  fallObject(i, parseInt(Math.random() * fallObjects.length), 1);
}
fall();
