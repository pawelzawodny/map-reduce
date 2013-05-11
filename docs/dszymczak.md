# Map Reduce

Za pomoc¹ poni¿szych funkcji generowana jest lista religii (z bazy census1881) wraz z liczb¹ ich wyznawców. Pod uwagê brane s¹ osoby w przedziale wiekowym od 18 do 60 lat.


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


Pe³ne dane wynikowe: [results.json](https://skydrive.live.com/redir?resid=3BDE303B2D273EC6!17114&authkey=!AL8hldB0hUHsEdE)

### Dane wynikowe (5 religii z najwiêksz¹ liczb¹ wyznawców):


![MapReduce - wykres](http://chart.apis.google.com/chart?chs=500x300&chbh=60,10&cht=bvo&chtt=Religie+z+najwieksza+liczba+wyznawcow&chd=t:84.7,57.6,52.1,49.2,40.2&chxt=x,y&chxl=0:|baptist|catholic|presbyterian|lutheran|methodist|1:|0|200|400|600|800|1000)


```
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