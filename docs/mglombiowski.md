#Map Reduce  - Całkowanie metodą prostokątów

### by Marcin Głombiowski


-----
-----



Jest to skrypt, który zapełnia bazę rekordami o kolejnych wartościach, a potem przeprowadza ich redukcję do jednej wartości jaką jest pole powierzchni.

------

####Definicja podstawowych wartości:

```js
var split = 200;
var len = 100;
var jump = split/len;
```

####Funkcje zapełniające bazę 
```js
var fill = function() {

db.test.remove();


for (i = 0; i < len; i += jump) {
  
    db.test.insert({x: i, y: func(i)})

}
};

var func = function(val) {

	return Math.sin((Math.PI*val) / 100) * 50;

};
```

####Funkcje odpowiedzialne kolejno za mapowanie i redukcję
```js
var map = function() {


	pole = 0.5 * this.y;
	
	emit("pole", pole);

	

};

var reduce = function(key, val) {
	print(val);
	return Array.sum(val);
};
```

####Wywołanie
```js
db.test.mapReduce(map, reduce, {out: "pole"});
```

###odczyt
```js
db.pole.findOne();
```

###Wynik
```
{ "_id" : "pole", "value" : 3183.0334117218044 }
```

[wartość z wolframalpha.com](http://www.wolframalpha.com/input/?i=integral+from+0+to+99+of+sin%28%28PI*x%29+%2F+100%29+*+50)
```
~=3182.31
```