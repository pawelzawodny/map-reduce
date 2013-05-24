#Map Reduce  - Ca�kowanie metod� prostok�t�w

### by Marcin G�ombiowski


-----
-----



Jest to skrypt, kt�ry zape�nia baz� rekordami o kolejnych warto�ciach, a potem przeprowadza ich redukcj� do jednej warto�ci jak� jest pole powierzchni.

------

####Definicja podstawowych warto�ci:

```js
var split = 200;
var len = 100;
var jump = split/len;
```

####Funkcje zape�niaj�ce baz� 
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

####Funkcje odpowiedzialne kolejno za mapowanie i redukcj�
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

####Wywo�anie
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

[warto�� z wolframalpha.com](http://www.wolframalpha.com/input/?i=integral+from+0+to+99+of+sin%28%28PI*x%29+%2F+100%29+*+50)
```
~=3182.31
```


