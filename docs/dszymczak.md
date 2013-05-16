# Map Reduce

### *Daniel Szymczak*

## 1. agregacja

Za pomocą poniższych funkcji generowana jest lista religii (z bazy census1881) wraz z liczbą ich wyznawców. Pod uwagę brane są osoby w przedziale wiekowym od 18 do 60 lat.


### Funkcja Map:
```js
var mapFunction = function() {
	emit(this.religion, this.age);
};
```

### Funkcja Reduce:

```js
var reduceFunction = function(key, values) {
	var count = 0;
	for(i in values) {
		if(values[i] > 18 && values[i] < 60) {
			count++;
		}
	}
	return count;
};
```


Pełne dane wynikowe: [results.json](https://skydrive.live.com/redir?resid=3BDE303B2D273EC6!17114&authkey=!AL8hldB0hUHsEdE)

### Dane wynikowe (5 religii z największą liczbą wyznawców):


![MapReduce 1 - wykres](https://raw.github.com/nosql/map-reduce/master/images/dszymczak_wykres_mapreduce1.png)


```json
{ 
	"_id" : "baptist", 
	"value" : 847 
}
{ 
	"_id" : "catholic", 
	"value" : 576 
}
{ 
	"_id" : "presbyterian", 
	"value" : 521
{ 
	"_id" : "lutheran", 
	"value" : 492 
}
{ 
	"_id" : "methodist", 
	"value" : 402 
}
```

## 2. agregacja

Za pomocą poniższych funkcji generowana jest lista typów lotnisk (z bazy airports) wraz z liczbą ich występowania.


### Funkcja Map:
```js
var mapFunction = function() {
    emit(this.type,1);
};
```

### Funkcja Reduce:

```js
var reduceFunction = function(key, values) {
    return Array.sum(values);
};
```


### Dane wynikowe:

![MapReduce 2 - wykres](https://raw.github.com/nosql/map-reduce/master/images/dszymczak_wykres_mapreduce2.png)


```json
{
	"results" : [
		{
			"_id" : "balloonport",
			"value" : 17
		},
		{
			"_id" : "closed",
			"value" : 1221
		},
		{
			"_id" : "heliport",
			"value" : 8731
		},
		{
			"_id" : "large_airport",
			"value" : 562
		},
		{
			"_id" : "medium_airport",
			"value" : 4528
		},
		{
			"_id" : "seaplane_base",
			"value" : 895
		},
		{
			"_id" : "small_airport",
			"value" : 29026
		}
	],
	"timeMillis" : 756,
	"counts" : {
		"input" : 44980,
		"emit" : 44980,
		"reduce" : 1645,
		"output" : 7
	},
	"ok" : 1,
}
```