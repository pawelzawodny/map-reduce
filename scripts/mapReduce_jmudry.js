parts = 10; //podział na 100*100 części
n = 10000; // ilośc losowanych punktów w kazdym fragmencie


for (i = 0; i < parts; i += 1) {
  for (j = 0; j < parts; j += 1) {
    db.pi_parts33.insert({x_from: i/parts, x_to: (i+1)/parts, y_from: j/parts, y_to: (j+1)/parts, n: n, parts: parts })
  }
}

m = function () {
  for (i = 0; i < this.n; i += 1) {
    x = (Math.random() * (this.x_from - this.x_to)) + this.x_to;
    y = (Math.random() * (this.y_from - this.y_to)) + this.y_to;
    if (x*x + y*y <= 1) {
      emit("count", 1)
    }
  }
};

r = function (key, values) {
  return Array.sum(values)
};

db.pi_parts33.mapReduce(m, r, {out: "pi"});
db.pi.findOne().value/(parts*parts*n) * 4