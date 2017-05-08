console.log('SKRIPTA');

function startGame() {
  // myGamePiece = new component(20, 10, "../images/car.png", 10, 10, "image");
  // myObstacle  = new component(10, 10, "green", 30, 30, "obstacle");
  myGamePiece = new component(20, 10, "red", 10, 10);
  myObstacle  = new component(10, 10, "green", 30, 30);
  myGameArea.start();
}

// function component(width, height, color, x, y, type) {
//   this.type = type;
//   if (type == "image") {
//     this.image = new Image();
//     this.image.src = color;
//   }
//   this.width = width;
//   this.height = height;
//   this.speedX = 0;
//   this.speedY = 0;
//   this.x = x;
//   this.y = y;
//   this.update = function () {
//     ctx = myGameArea.context;
//     if (type == "image") {
//       ctx.drawImage(this.image,
//         this.x,
//         this.y,
//         this.width, this.height);
//     } else {
//       ctx.fillStyle = color;
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//   }
//   this.newPos = function () {
//     this.x += this.speedX;
//     this.y += this.speedY;
//   }
// }

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

var myGamePiece;
var myObstacle;

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.style.width  = "80%";
    this.canvas.style.height = "60%";
    this.canvas.style.marginLeft = "10%";
    this.canvas.style.marginTop = "5%";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  }
}

function updateGameArea() {
  if (myGamePiece.crashWith(myObstacle)) {
    newPool(); //radi novu anketu
    $("#anketa").modal('show');
    myGameArea.clear();
    myObstacle = null;
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;
    myGamePiece.update();
  } else {
    myGameArea.clear();
    myObstacle.update();
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;
    myGamePiece.update();
  }
}

function moveup() {
  myGamePiece.speedY = -1;
}

function movedown() {
  myGamePiece.speedY = 1;
}

function moveleft() {
  myGamePiece.speedX = -1;
}

function moveright() {
  myGamePiece.speedX = 1;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

document.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 38) { //up key
    moveup();
  } else if (code === 40) { //down key
    movedown();
  } else if (code === 37) { //down key
    moveleft();
  } else if (code === 39) { //down key
    moveright();
  }
};

document.onkeyup = function () {
  clearmove();
}
