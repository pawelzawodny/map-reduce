## Map Reduce na dużej ilości dokumentów tekstowych

### *Damian Szafranek*

Map Reduce na plikach tesktowych w języku angielskim w celu przeanalizowania częstotliwości występowania poszczególnych słów.
Ilość dokumentów: 84678
Wszystkich słów: 39749179


Funkcja Map:

```js
	var map = function() {
		this.tekst.match(/[a-z]+/g).forEach(function(word){
				emit(word, 1);
			});
		};
```

Funkcja Reduce:

```js
	var reduce = function(key, val) {
		var count = 0;
		for(i = 0; i < val.length; i++) {
			count += val[i];
		}
		return count;
	};
```

Wynik MapReduce zapisany do kolekcji wynik, następnie pobranie danych z tej kolekcji

```js
var result1 = db.textfiles.mapReduce(map, reduce, {out: 'wynik'});
```

a) 20 najczęściej występujących słów

```js
db.wynik.find().sort({'value': -1}).limit(20)
```
Wynik:

```js
{ "_id" : "the", "value" : 2420778 }
{ "_id" : "of", "value" : 1045733 }
{ "_id" : "to", "value" : 968882 }
{ "_id" : "a", "value" : 892429 }
{ "_id" : "and", "value" : 865644 }
{ "_id" : "in", "value" : 847825 }
{ "_id" : "said", "value" : 504593 }
{ "_id" : "for", "value" : 363865 }
{ "_id" : "that", "value" : 347072 }
{ "_id" : "was", "value" : 293027 }
{ "_id" : "on", "value" : 291947 }
{ "_id" : "be", "value" : 250919 }
{ "_id" : "is", "value" : 246843 }
{ "_id" : "with", "value" : 223846 }
{ "_id" : "at", "value" : 210064 }
{ "_id" : "by", "value" : 209586 }
{ "_id" : "it", "value" : 195621 }
{ "_id" : "from", "value" : 189451 }
{ "_id" : "as", "value" : 181714 }
{ "_id" : "be", "value" : 157300 }
```
![Chart1](https://raw.github.com/dszafranek/map-reduce/master/images/dszafranek1.png)


```js
http://chart.googleapis.com/chart
  ?chxl=0:|be|as|from|it|by|at|with|is|be|on|was|that|for|said|in|and|a|to|of|the
  &chxr=a
  &chxt=y,x
  &chbh=a
  &chs=640x320
  &cht=bhg
  &chco=C0300,000000
  &chds=a
  &chd=t:2420778,1045733,968882,892429,865644,847825,504593,363865,347072,
  	293027,291947,250919,246843,223846,210064,209586,195621,189451,181714,157300
  &chma=100
  &chtt=czestotliwosc+wystepowania+slow
```

b) 4 najrzadziej występujące słowa

```js
db.wynik.find().sort({'value': 1}).limit(4)
```

Wynik:

```js
{ "_id" : "assistant", "value" : 4095 }
{ "_id" : "sewers", "value" : 100 }
{ "_id" : "toothbrush", "value" : 10 }
{ "_id" : "hazmat", "value" : 1 }
```
![Chart1](https://raw.github.com/dszafranek/map-reduce/master/images/dszafranek2.png)

```js
http://chart.googleapis.com/chart
  ?chxl=0:hazmat|toothbrush|sewers|assistant
  &chxr=a
  &chxt=y,x
  &chbh=a
  &chs=640x320
  &cht=bhg
  &chco=C0300,000000
  &chds=a
  &chd=t:4095,100,10,1
  &chma=100
  &chtt=czestotliwosc+wystepowania+slow
```

Wnioski:

Jak widać, rozbieżność występowania słów jest olbrzymia. Do tego w ścisłej czołowce są same tak zwane 'słowa-stopu' czyli słowa, które same z siebie nie mają żadnego znaczenia.
