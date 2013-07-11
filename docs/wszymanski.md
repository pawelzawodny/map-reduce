# Map Reduce - Samochody w USA
### *Wojciech Szymański*

Wyliczam procent skrzyni automatycznych w poszczególnych markach

## Funkcja map

```js
var map = function() {
  emit(this.make, { make: this.make, transmission: this.transmission });
};
```

## Funkcja reduce

```js

var reduce = function(key, vals) {
  var obj = {
    make: key,
    automatic: 0,
    non_automatic: 0
  }, i;

  for (i in vals) {
    switch (vals[i]["transmission"]) {
      case "automatic":
        obj.automatic += 1;
        break;
      default:
        obj.non_automatic += 1;
    }
  }
  obj.automatic_transmission_percent = Math.round(obj.automatic / (obj.automatic + obj.non_automatic) * 100);
  return obj;
};
```

## Map Reduce na kolekcji car_market

```js
db.car_market.mapReduce(map, reduce, { out: "transmission" });
```

## Wyniki agregacji

```json
{ 
  "_id" : "acura", 
  "value" : { 
    "make" : "acura", 
    "automatic" : 4, 
    "non_automatic" : 10, 
    "automatic_transmission_percent" : 29 
  } 
}
```

## Wykres wykonany przy użyciu Google Chart Tools

![google_chart1](../images/ws_chart3.png)

```
http://chart.googleapis.com/chart
  ?chxl=0:|lincoln|lexus|chrysler|cadillac|buick|mercedes-benz|jaguar
  &chxr=a
  &chxt=y,x
  &chbh=a
  &chs=640x320
  &cht=bhg
  &chco=E00000
  &chds=a
  &chd=t:92,90,89,89,82,71,71
  &chma=100
  &chtt=procent+skrzyni+automatycznych+w+autach
```

## Pliki:

[json po map_reduce] (/data/json/ws_reduced.json)
