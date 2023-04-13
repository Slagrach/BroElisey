var toggle = document.getElementById("toggle");
var center = document.querySelector(".center");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  center.classList.toggle("active");
});

var c = document.getElementById("c"),
  ctx = c.getContext("2d"),
  cw = (c.width = 300),
  ch = (c.height = 300),
  parts = [],
  partCount = 200,
  partsFull = false,
  hueRange = 50,
  globalTick = 0,
  rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

var Part = function () {
  this.reset();
};

Part.prototype.reset = function () {
  this.startRadius = rand(1, 25);
  this.radius = this.startRadius;
  this.x = cw / 2 + (rand(0, 6) - 3);
  this.y = 250;
  this.vx = 0;
  this.vy = 0;
  this.hue = rand(globalTick - hueRange, globalTick + hueRange);
  this.saturation = rand(50, 100);
  this.lightness = rand(20, 70);
  this.startAlpha = rand(1, 10) / 100;
  this.alpha = this.startAlpha;
  this.decayRate = 0.1;
  this.startLife = 7;
  this.life = this.startLife;
  this.lineWidth = rand(1, 3);
};

Part.prototype.update = function () {
  this.vx += (rand(0, 200) - 100) / 1500;
  this.vy -= this.life / 50;
  this.x += this.vx;
  this.y += this.vy;
  this.alpha = this.startAlpha * (this.life / this.startLife);
  this.radius = this.startRadius * (this.life / this.startLife);
  this.life -= this.decayRate;
  if (
    this.x > cw + this.radius || this.x < -this.radius || this.y > ch + this.radius || this.y < -this.radius || this.life <= this.decayRate
  ) {
    this.reset();
  }
};

Part.prototype.render = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ctx.strokeStyle =
    "hsla(" + this.hue + ", " + this.saturation + "%, " + this.lightness + "%, " + this.alpha + ")";
  ctx.lineWidth = this.lineWidth;
  ctx.fill();
  ctx.stroke();
};

var createParts = function () {
  if (!partsFull) {
    if (parts.length > partCount) {
      partsFull = true;
    } else {
      parts.push(new Part());
    }
  }
};

var updateParts = function () {
  var i = parts.length;
  while (i--) {
    parts[i].update();
  }
};

var renderParts = function () {
  var i = parts.length;
  while (i--) {
    parts[i].render();
  }
};

var clear = function () {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "hsla(0, 0%, 0%, .3)";
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "lighter";
};

var loop = function () {
  window.requestAnimFrame(loop, c);
  clear();
  createParts();
  updateParts();
  renderParts();
  globalTick++;
};

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
      window.setTimeout(a, 1e3 / 60);
    }
  );
})();

loop();

var makeItRain = function () {
  //clear out everything
  $(".rain").empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    //random number between 5 and 2
    var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops +=
      '<div class="drop" style="left: '
      + increment
      + "%; bottom: "
      + (randoFiver + randoFiver - 1 + 100)
      + "%; animation-delay: 0."
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"><div class="stem" style="animation-delay: 0.'
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"></div><div class="splat" style="animation-delay: 0.'
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"></div></div>';
    backDrops +=
      '<div class="drop" style="right: '
      + increment
      + "%; bottom: "
      + (randoFiver + randoFiver - 1 + 100)
      + "%; animation-delay: 0."
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"><div class="stem" style="animation-delay: 0.'
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"></div><div class="splat" style="animation-delay: 0.'
      + randoHundo
      + "s; animation-duration: 0.5"
      + randoHundo
      + 's;"></div></div>';
  }

  $(".rain.front-row").append(drops);
  $(".rain.back-row").append(backDrops);
};

$(".splat-toggle.toggler").on("click", function () {
  $("body").toggleClass("splat-toggle");
  $(".splat-toggle.toggler").toggleClass("active");
  makeItRain();
});

$(".back-row-toggle.toggler").on("click", function () {
  $("body").toggleClass("back-row-toggle");
  $(".back-row-toggle.toggler").toggleClass("active");
  makeItRain();
});

$(".single-toggle.toggler").on("click", function () {
  $("body").toggleClass("single-toggle");
  $(".single-toggle.toggler").toggleClass("active");
  makeItRain();
});

makeItRain();
