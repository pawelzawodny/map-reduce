# Map reduce

Obliczamy sumę trzęsień ziemi dla danego regionu

## Funkcja map
```js
var map = function() {
	emit(this.Region, 1);
};
```

## Funkcja reduce
```js
var reduce = function(key, values) {
	var sum = 0;
	values.forEach(function(v) {
		sum += 1
	});
	return {
		count: sum
	};
};
```

## Map Reduce kolekcji
```js
db.earthquakes.mapReduce(map, reduce, {
	out: "earthquakes_sum"
});
```

## Wyświetlenie rezultatu
```js
db.earthquakes_sum.find({});
```

## Rezultat

```json
{
  "_id": "Alaska Peninsula",
  "value": {
    "count": 11
  }
}
{
  "_id": "Andreanof Islands, Aleutian Islands, Alaska",
  "value": {
    "count": 36
  }
}
{
  "_id": "Arkansas",
  "value": {
    "count": 9
  }
}
{
  "_id": "Baja California, Mexico",
  "value": {
    "count": 4
  }
}
{
  "_id": "British Columbia, Canada",
  "value": {
    "count": 5
  }
}

{
  "_id": "Central Alaska",
  "value": {
    "count": 142
  }
}
{
  "_id": "Central California",
  "value": {
    "count": 94
  }
}
```

## Wykres
![Mapa](/images/jciechowski.png)

## Skrypt
* [Skrypt](/scripts/mapreduce_jciechowski.js)