# Map Reduce na liœcie lotnisk

### *Bart³omiej Bedra*

## Przyk³adowe dane:

```json
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
## Map reduce
### Funkcja map

```javascript
var m = function() {
    emit(
        {kraj: this.iso_country}, {count: 1}
    );
};
```

### Funkcja reduce

```javascript
var r = function(key, vals) {
	var count = 0;
    vals.forEach(function (v) {
        count += v['count'];
    });
    return {count: count};
};
```

### Przyk³adowe wywo³anie

```javascript
db.lotniska.mapReduce(m, r, {out: 'lotniska_results'});
```

## Wycinek wyniku:

```json
{ "_id" : { "kraj" : "AD" }, "value" : { "count" : 1 } }
{ "_id" : { "kraj" : "AE" }, "value" : { "count" : 29 } }
{ "_id" : { "kraj" : "AF" }, "value" : { "count" : 62 } }
{ "_id" : { "kraj" : "AG" }, "value" : { "count" : 3 } }
{ "_id" : { "kraj" : "AI" }, "value" : { "count" : 1 } }
{ "_id" : { "kraj" : "AL" }, "value" : { "count" : 8 } }
{ "_id" : { "kraj" : "AM" }, "value" : { "count" : 13 } }
{ "_id" : { "kraj" : "AO" }, "value" : { "count" : 55 } }
{ "_id" : { "kraj" : "AQ" }, "value" : { "count" : 24 } }
{ "_id" : { "kraj" : "AR" }, "value" : { "count" : 699 } }
{ "_id" : { "kraj" : "AS" }, "value" : { "count" : 4 } }
{ "_id" : { "kraj" : "AT" }, "value" : { "count" : 134 } }
{ "_id" : { "kraj" : "AU" }, "value" : { "count" : 1725 } }
{ "_id" : { "kraj" : "AW" }, "value" : { "count" : 1 } }
{ "_id" : { "kraj" : "AZ" }, "value" : { "count" : 35 } }
{ "_id" : { "kraj" : "BA" }, "value" : { "count" : 11 } }
{ "_id" : { "kraj" : "BB" }, "value" : { "count" : 2 } }
{ "_id" : { "kraj" : "BD" }, "value" : { "count" : 14 } }
{ "_id" : { "kraj" : "BE" }, "value" : { "count" : 117 } }
{ "_id" : { "kraj" : "BF" }, "value" : { "count" : 49 } }

```

### Wykres

![Wykres](https://raw.github.com/nosql/map-reduce/master/images/bbedra/liczba_lotnisk.png)

```
http://chart.googleapis.com/chart
?chxl=0:|AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AZ|BA|BB|BD|BE|BF
&chxt=x
&chbh=a,1
&chs=540x240
&cht=bvs
&chd=s:BSmCBFIiP_C__BVHBJ_e
&chdl=liczba+lotnisk
&chtt=Liczba+lotnisk
```