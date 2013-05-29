# Map Reduce

### *Adrian Szulc*

## Dane użyte w Map Reduce [AIRPORTS](https://github.com/nosql/data-refine/blob/master/data/json/bbedra_airports_csv.json) za pośrednictwem [Bartłomiej Bedra](https://github.com/nosql/data-refine/blob/master/docs/bbedra.md)

## Przykład danych

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
      "gps_code" : "00A"
    }
```

## Ilość lotnisk w poszczególnych państwach.

Funkcja Map

```js
var map = function() {
        emit(this.iso_country, 1);
};
```

Funkcja Reduce

```js
var reduce = function(key, val) {
        var count = 0;
        for(i=0; i<val.length; i++) {
            count += val[i];
        }
        return count;
};
```

Użycie Map Reduce na kolekcji 

```js
var res1 = db.airports1.mapReduce(map, reduce, {out: 'result1'});
```

Częściowy wynik

```js
{ "_id" : "AD", "value" : 1 }
{ "_id" : "AE", "value" : 29 }
{ "_id" : "AF", "value" : 62 }
{ "_id" : "AG", "value" : 3 }
{ "_id" : "AI", "value" : 1 }
{ "_id" : "AL", "value" : 8 }
{ "_id" : "AM", "value" : 13 }
{ "_id" : "AO", "value" : 55 }
{ "_id" : "AQ", "value" : 24 }
{ "_id" : "AR", "value" : 699 }
{ "_id" : "AS", "value" : 4 }
{ "_id" : "AT", "value" : 134 }
{ "_id" : "AU", "value" : 1725 }
{ "_id" : "AW", "value" : 1 }
{ "_id" : "AZ", "value" : 35 }
{ "_id" : "BA", "value" : 11 }
{ "_id" : "BB", "value" : 2 }
{ "_id" : "BD", "value" : 14 }
{ "_id" : "BE", "value" : 117 }
{ "_id" : "BF", "value" : 49 }
```

Wykres

![google_chart1](https://raw.github.com/aszulc/map-reduce/master/images/aszulc_mr1.png)

## Ilość poszczególnych typów lotnisk na świecie.

Funkcja Map

```js
var map = function() {
        emit(this.type, 1);
};
```

Funkcja Reduce

```js
var reduce = function(key, val) {
        var count = 0;
        for(i=0; i<val.length; i++) {
            count += val[i];
        }
        return count;
};
```

Użycie Map Reduce na kolekcji 

```js
var res2 = db.airports1.mapReduce(map, reduce, {out: 'result2'});
```

Wynik

```js
{ "_id" : "balloonport", "value" : 17 }
{ "_id" : "closed", "value" : 1221 }
{ "_id" : "heliport", "value" : 8731 }
{ "_id" : "large_airport", "value" : 562 }
{ "_id" : "medium_airport", "value" : 4528 }
{ "_id" : "seaplane_base", "value" : 895 }
{ "_id" : "small_airport", "value" : 29026 }
```

Wykres

![google_chart1](https://raw.github.com/aszulc/map-reduce/master/images/aszulc_mr2.png)
















