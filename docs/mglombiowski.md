#Map Reduce  - Ca³kowanie metod¹ prostok¹tów

### by Marcin G³ombiowski


-----
-----



Jest to skrypt, który zape³nia bazê rekordami o kolejnych wartoœciach, a potem przeprowadza ich redukcjê do jednej wartoœci jak¹ jest pole powierzchni.

------

####Definicja podstawowych wartoœci:

```js
var split = 200;
var len = 100;
var jump = split/len;
```

####Funkcje zape³niaj¹ce bazê 
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

####Funkcje odpowiedzialne kolejno za mapowanie i redukcjê
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

####Wywo³anie
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

![wartoœæ z wolframalpha.com](http://www.wolframalpha.com/input/?i=integral+from+0+to+99+of+sin%28%28PI*x%29+%2F+100%29+*+50)
```
~=3182.31
```


