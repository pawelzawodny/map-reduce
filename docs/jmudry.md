# Obliczanie liczby pi metoda Monte Carlo

## Parametry podziałowe
```js
parts = 10; //podział na 10*10 części
n = 10000; // ilośc losowanych punktów w kazdym fragmencie
```
## Opis
Opis metody: [Metoda_Monte_Carlo](http://pl.wikipedia.org/wiki/Metoda_Monte_Carlo)

W naszym przypadku dzielimy obszar generowania punktów na ```parts*parts``` części i w każdym z nich generujemy ```n``` punktów i zliczamy poprzez reduce ilość punktów w okręgu.

##  Generowanie części kwadratu:
```js
for (i = 0; i < parts; i += 1) {
  for (j = 0; j < parts; j += 1) {
    db.pi_parts.insert({x_from: i/parts, x_to: (i+1)/parts, y_from: j/parts, y_to: (j+1)/parts, n: n, parts: parts })
  }
}
```
## Map reduce
### Funkcja map

```javascript
var m = function () {
  for (i = 0; i < this.n; i += 1) {
    x = (Math.random() * (this.x_from - this.x_to)) + this.x_to;
    y = (Math.random() * (this.y_from - this.y_to)) + this.y_to;
    if (x*x + y*y <= 1) {
      emit("count", 1)
    }
  }
};
```
### Funkcja reduce

```javascript
var r = function (key, values) {
  return Array.sum(values)
};
```
### Wywołanie
```javascript
db.pi_parts.mapReduce(m, r, {out: "pi"});
```
## Wynik:
```bash
> db.pi.findOne().value/(parts*parts*n) * 4
> 3.14142
```

### Analiza

Może mało dokładna metoda, lecz dobrze obrazuje uzycie map reduce

## Linki
* [Skrypt](/scripts/mapReduce_jmudry.js)
