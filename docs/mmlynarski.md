## Maciej Młynarski - map reduce

###Obliczenia
```
var map = function() {
    emit(this.ISO, 1);
};

var reduce = function(key, val) {
    var count = 0;
	for(i = 0; i < val.length; i++) {
		count += val[i];
	}
	return count;
};

db.UFC_Fighters.mapReduce(
    map,
	reduce,
	{ out : "result" }
);
```

###Wyniki
```
{ "_id" : "AFG", "value" : 1 }
{ "_id" : "ARM", "value" : 2 }
{ "_id" : "AUS", "value" : 6 }
{ "_id" : "AUT", "value" : 1 }
{ "_id" : "BAH", "value" : 1 }
{ "_id" : "BEL", "value" : 1 }
{ "_id" : "BGR", "value" : 1 }
{ "_id" : "BRA", "value" : 70 }
{ "_id" : "CAN", "value" : 22 }
{ "_id" : "CHN", "value" : 2 }
{ "_id" : "COD", "value" : 1 }
{ "_id" : "CRO", "value" : 1 }
{ "_id" : "CUB", "value" : 2 }
{ "_id" : "CYP", "value" : 1 }
{ "_id" : "CZE", "value" : 1 }
{ "_id" : "DEN", "value" : 1 }
{ "_id" : "ELS", "value" : 1 }
{ "_id" : "FRA", "value" : 1 }
{ "_id" : "GER", "value" : 2 }
{ "_id" : "GUM", "value" : 1 }
{ "_id" : "HAI", "value" : 1 }
{ "_id" : "IRE", "value" : 1 }
{ "_id" : "ISL", "value" : 1 }
{ "_id" : "ITA", "value" : 1 }
{ "_id" : "JAM", "value" : 1 }
{ "_id" : "JPN", "value" : 9 }
{ "_id" : "KOR", "value" : 4 }
{ "_id" : "MEX", "value" : 1 }
{ "_id" : "NED", "value" : 4 }
{ "_id" : "NIG", "value" : 1 }
{ "_id" : "NZL", "value" : 3 }
{ "_id" : "POL", "value" : 1 }
{ "_id" : "RUS", "value" : 6 }
{ "_id" : "SWE", "value" : 6 }
{ "_id" : "UK", "value" : 18 }
{ "_id" : "USA", "value" : 202 }
{ "_id" : "VEN", "value" : 1 }
{ "_id" : "VNM", "value" : 1 }
```
