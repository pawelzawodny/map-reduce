# mapReduce

### *Anna Łońska*

# Lotniska

## Przykładowe dane

```js
{
  "id" : 6523,
  "type" : "heliport",
  "name" : "Total Rf Heliport",
  "latitude_deg" : 40.07080078125,
  "longitude_deg" : -74.9336013793945,
  "elevation_ft" : 11,
  "continent" : "NA",
  "iso_country" : "US",
  "iso_region" : "US-PA",
  "municipality" : "Bensalem",
  "scheduled_service" : "no",
  "gps_code" : "00A"
}
```

## Liczba typów lotnisk

### Funkcje map i reduce

```js
var map = function() {
	emit(
		{typ: this.type}, {count: 1}
	);
};

var red = function(key, values) {
	var count = 0;
	values.forEach(function (val) {
		count += val['count'];
	});
	return {count: count};
};
```

### Przykładowe wywołanie

```js
db.airports.mapReduce(map, red, {out: {inline: 1}});
```

### Wynik

```js
{
	"results" : [
		{ "_id" : {"typ" : "balloonport"}, "value" : {"count" : 17}}, 
		{ "_id" : {"typ" : "closed"}, "value" : {"count" : 1235}},
		{ "_id" : {"typ" : "heliport"}, "value" : {"count" : 8741}},
		{ "_id" : {"typ" : "large_airport"}, "value" : {"count" : 569}},
		{ "_id" : {"typ" : "medium_airport"}, "value" : {"count" : 4533}},
		{ "_id" : {"typ" : "seaplane_base"}, "value" : {"count" : 899}},
		{ "_id" : {"typ" : "small_airport"}, "value" : {"count" : 29138}}
	],
	"timeMillis" : 3035,
	"counts" : {
		"input" : 45132,
		"emit" : 45132,
		"reduce" : 1667,
		"output" : 7
	},
	"ok" : 1,
}
```

### Wykres

![typ](https://raw.github.com/Iskratgz/mapReduce/master/images/alonska/typ.png)

## Liczba lotnisk na kontynentach

### Funkcje map i reduce

```js
var map = function() {
	emit(
		{kontynent: this.continent}, {count: 1}
	);
};

var red = function(key, values) {
	var count = 0;
	values.forEach(function (val) {
		count += val['count'];
	});
	return {count: count};
};
```

### Przykładowe wywołanie

```js
db.airports.mapReduce(map, red, {out: {inline: 1}});
```

### Wynik

```js
{
	"results" : [
		{ "_id" : {"kontynent" : "AF"}, "value" : {"count" : 2514}},
		{ "_id" : {"kontynent" : "AN"}, "value" : {"count" : 26}},
		{ "_id" : {"kontynent" : "AS"}, "value" : {"count" : 3411}},
		{ "_id" : {"kontynent" : "EU"}, "value" : {"count" : 4917}},
		{ "_id" : {"kontynent" : "NA"}, "value" : {"count" : 24942}},
		{ "_id" : {"kontynent" : "OC"}, "value" : {"count" : 2475}},
		{ "_id" : {"kontynent" : "SA"}, "value" : {"count" : 6847}}
	],
	"timeMillis" : 2848,
	"counts" : {
		"input" : 45132,
		"emit" : 45132,
		"reduce" : 841,
		"output" : 7
	},
	"ok" : 1,
}
```

### Wykres

![kontynent](https://raw.github.com/Iskratgz/mapReduce/master/images/alonska/kontynent.png)

## Liczba lotnisk w państwach

### Funkcje map i reduce

```js
var map = function() {
	emit(
		{panstwo: this.iso_country}, {count: 1}
	);
};

var red = function(key, values) {
	var count = 0;
	values.forEach(function (val) {
		count += val['count'];
	});
	return {count: count};
};
```

### Przykładowe wywołanie

```js
db.airports.mapReduce(map, red, {out: "panstwo"});
db.panstwo.find();
```

### Wycinek wyniku

```js
{ "_id" : { "panstwo" : "AD" }, "value" : { "count" : 1 } }
{ "_id" : { "panstwo" : "AE" }, "value" : { "count" : 29 } }
{ "_id" : { "panstwo" : "AF" }, "value" : { "count" : 62 } }
{ "_id" : { "panstwo" : "AG" }, "value" : { "count" : 3 } }
{ "_id" : { "panstwo" : "AI" }, "value" : { "count" : 1 } }
{ "_id" : { "panstwo" : "AL" }, "value" : { "count" : 8 } }
{ "_id" : { "panstwo" : "AM" }, "value" : { "count" : 13 } }
{ "_id" : { "panstwo" : "AO" }, "value" : { "count" : 55 } }
{ "_id" : { "panstwo" : "AQ" }, "value" : { "count" : 24 } }
{ "_id" : { "panstwo" : "AR" }, "value" : { "count" : 699 } }
{ "_id" : { "panstwo" : "AS" }, "value" : { "count" : 4 } }
{ "_id" : { "panstwo" : "AT" }, "value" : { "count" : 134 } }
{ "_id" : { "panstwo" : "AU" }, "value" : { "count" : 1725 } }
{ "_id" : { "panstwo" : "AW" }, "value" : { "count" : 1 } }
{ "_id" : { "panstwo" : "AZ" }, "value" : { "count" : 35 } }
{ "_id" : { "panstwo" : "BA" }, "value" : { "count" : 11 } }
{ "_id" : { "panstwo" : "BB" }, "value" : { "count" : 2 } }
{ "_id" : { "panstwo" : "BD" }, "value" : { "count" : 14 } }
{ "_id" : { "panstwo" : "BE" }, "value" : { "count" : 119 } }
{ "_id" : { "panstwo" : "BF" }, "value" : { "count" : 49 } }
```

### Plik z pełnym wynikiem

[panstwo.txt](https://github.com/Iskratgz/mapReduce/blob/master/data/alonska/panstwo.txt)

### Wykres

![panstwo](https://raw.github.com/Iskratgz/mapReduce/master/images/alonska/panstwo.png)

## Liczba lotnisk w regionach

### Funkcje map i reduce

```js
var map = function() {
	emit(
		{region: this.iso_region}, {count: 1}
	);
};

var red = function(key, values) {
	var count = 0;
	values.forEach(function (val) {
		count += val['count'];
	});
	return {count: count};
};
```

### Przykładowe wywołanie

```js
db.airports.mapReduce(map, red, {out: "region"});
db.region.find();
```

### Wycinek wyniku

```js
{ "_id" : { "region" : "AD-07" }, "value" : { "count" : 1 } }
{ "_id" : { "region" : "AE-AZ" }, "value" : { "count" : 16 } }
{ "_id" : { "region" : "AE-DU" }, "value" : { "count" : 7 } }
{ "_id" : { "region" : "AE-FU" }, "value" : { "count" : 1 } }
{ "_id" : { "region" : "AE-RK" }, "value" : { "count" : 2 } }
{ "_id" : { "region" : "AE-SH" }, "value" : { "count" : 1 } }
{ "_id" : { "region" : "AE-UQ" }, "value" : { "count" : 2 } }
{ "_id" : { "region" : "AF-BAL" }, "value" : { "count" : 2 } }
{ "_id" : { "region" : "AF-BAM" }, "value" : { "count" : 4 } }
{ "_id" : { "region" : "AF-BDG" }, "value" : { "count" : 1 } }
```

### Plik z pełnym wynikiem

[region.txt](https://github.com/Iskratgz/mapReduce/blob/master/data/alonska/region.txt)

### Wykres

![region](https://raw.github.com/Iskratgz/mapReduce/master/images/alonska/region.png)

