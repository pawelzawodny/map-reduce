# Map Reduce na Rynku samochodów osobowych w USA w 2000 roku

Samochody są agregowane według marek, liczone jest srednie spalanie produkowanych przez danę firmę samochodów oraz ich średnia moc

## Przykładowe dane:

```json
{
  "make" : "bmw",
  "model" : "328ci",
  "price" : 34560,
  "wheel_base" : 107.3,
  "length" : 176.7,
  "width" : 68.5,
  "height" : 54.6,
  "curb_weight" : 3197,
  "horse_power" : 193,
  "rpm" : 5500,
  "transmission" : "manual",
  "mpg_city" : 21,
  "mpg_highway" : 29
}
```
## Map reduce
### Funkcja map
Tworzy obiekt składający się z marki, mocy, i wskaźnika MPG już wstepnie zagregowanego z MPG w mieście i w terenie
```javascript
var m = function() {
    emit(
        this.make,
        {make: this.make, avgHP: this.horse_power, avgMPG: this.mpg_city + this.mpg_highway}
    );
};
```

### Funkcja reduce

Zlicza dane modli w ramach tej samej marki

```javascript
var r = function(key, vals) {
    var obj = {
        make: key,
        avgHP: 0,
        avgMPG: 0
    };
    var count = 0;

    for(var j in vals) {
        var v = vals[j];
        obj.avgHP += v.avgHP;
        obj.avgMPG += v.avgMPG;
        count += 1;
    }
    obj.avgHP /= count;
    obj.avgMPG /= (count*2);

    return obj;
};
```

### Przykładowe wywołanie

```javascript
db.cars.mapReduce(m, r, {out: "makes_avg_HP"});
```

## Zredukowane dane:

```json
{
    "_id" : "infiniti",
    "value" : {
        "make" : "infiniti",
        "avgHP" : 212.66666666666666,
        "avgMPG" : 23.666666666666668
    }
}

```

### Wykres dla losowo wybranych marek

<img src="http://chart.googleapis.com/chart
   ?chxl=0:|jaguar|infiniti|hyundai|honda|ford|dodge|daewoo|chrysler|chevrolet
   &chxr=a
   &chxt=y,x
   &chbh=a
   &chs=640x320
   &cht=bhg
   &chco=4D89D9,C6D9FD
   &chds=a
   &chd=t:313,212,126,148,185,228,119,189,184|20.09,23.66,28.5,30.37,25.14,23.77,27.6,23.8,27.97
   &chma=100
   &chtt=moc+marek" />

## Linki
* [Skrypt](/scripts/mapreduce_xjedam.js)