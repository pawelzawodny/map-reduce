## Map Reduce na danych: [UNESCO] (https://raw.github.com/nosql/data-refine/master/data/json/unesco_eastern_europe.json), [WW2 Tanks] (https://raw.github.com/nosql/data-refine/master/data/json/ww2tanks.json)

### *Damian Szafranek*

1.Map Reduce dotyczący listy UNESCO w Europie Wschodniej, mający na celu wyłonienie państw z największą ich ilością.

Funkcja Map:

```js
var map = function() {
    emit(this.country, 1);
};
```

Funkcja Reduce:

```js
var reduce = function(key, val) {
    var count = 0;
    for(i=0; i<val.length; i++) {
		count += val[i];
    }
    return count;
};
```

Wynik MapReduce zapisany do kolekcji wynik:

```js
var result1 = db.unesco.mapReduce(map, reduce, {out: 'wynik'});
```

```js
{
"result" : "result1",
"timeMillis" : 66,
"counts" : {
    "input" : 125,
    "emit" : 125,
    "reduce" : 18,
    "output" : 9
    },
"ok" : 1,
}
```

Wynik:

```js
db.wynik.find().sort({'value': -1})
```
 
```js
{"_id" : "Russia","value" : 32},
{"_id" : "Bulgaria","value" : 18},
{"_id" : "Poland","value" : 17},
{"_id" : "Czech","value" : 16},
{"_id" : "Romania","value" : 12},
{"_id" : "Hungary","value" : 11},
{"_id" : "Ukraine","value" : 8},
{"_id" : "Slovakia", "value" : 7},
{"_id" : "Belarus", "value" : 4}
```

![Chart1](https://raw.github.com/dszafranek/map-reduce/master/images/dszafranek1.png)

```js
http://chart.googleapis.com/chart
  ?chxl=0:|Belarus|Slovakia|Ukraine|Hungary|Romania|Czech|Poland|Bulgaria|Russia|
  &chxr=a
  &chxt=y,x
  &chbh=a
  &chs=640x320
  &cht=bhg
  &chco=C0300,000000
  &chds=a
  &chd=t:32,18,17,16,12,11,8,7,4
  &chma=100
  &chtt=Lista+UNESCO+w+Europie+Wschodniej
```

2.Map Reduce dotyczący typów czołgów używanych w czasie trwania II Wojny Światowej, mający na celu wyłonienie państw z największą ich ilością.

Funkcja Map:

```js
var map = function() {
    emit(this.Country, 1);
};
```

Funkcja Reduce:

```js
var reduce = function(key, val) {
    var count = 0;
    for(i=0; i<val.length; i++) {
		count += val[i];
    }
    return count;
};
```

Wynik MapReduce zapisany do kolekcji wynik:

```js
var result1 = db.tanks.mapReduce(map, reduce, {out: 'wynik'});
```

Wynik:

```js
db.wynik.find().sort({'value': -1})
```
 
```js
{"_id" : "United Kingdom","value" : 35},
{"_id" : "Soviet Union","value" : 27},
{"_id" : "Japan","value" : 17},
{"_id" : "Nazi Germany","value" : 16},
{"_id" : "United States","value" : 13},
{"_id" : "France","value" : 11},
{"_id" : "Italy","value" : 5},
{"_id" : "Poland", "value" : 4},
{"_id" : "Australia", "value" : 3},
{"_id" : "Czechoslovakia", "value" : 3},
{"_id" : "Canada", "value" : 1}
```

![Chart1](https://raw.github.com/dszafranek/map-reduce/master/images/dszafranek2.png)

```js
http://chart.googleapis.com/chart
  ?chxl=0:|Canada|Czechoslovakia|Australia|Poland|Italy|France|United States|Nazi Germany|Japan|Soviet Union|United Kingdom|
  &chxr=a
  &chxt=y,x
  &chbh=a
  &chs=640x320
  &cht=bhg
  &chco=C0300,000000
  &chds=a
  &chd=t:35,27,17,16,13,11,5,4,3,3,1
  &chma=100
  &chtt=Typy+czołgów+wykorzystanych+w+trakcie+II+Wojny+Światowej
```
