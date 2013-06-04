### Marek Dubrawa
# Map Reduce na rynku samochodów osobowych w USA w 2000 roku

Samochody są agregowane według marek i wyliczamy ile średnio płacimy za jednego konia mechanicznego mocy w samochodach danej marki 

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

Aggreguje ona dane na temat samochodów na podstawie marki

```javascript
var map = function () {
    emit(this.make, {
        rows: [{
		m: this.make,
                p: this.price,
                hp: this.horse_power,
                data: [],
                avgNumberOfMh: 0,
		avgPriceOfCar: 0,
            }
        ]
    });
};
```

### Funkcja reduce

Redukuje z aggregowane dane po markach tak aby otrzymać jeden rekord.

```javascript
var reduce = function (key, values) {
    var reduced = {
        rows: []
    }, tmpData = [],
        tmpAvgPriceOfCar = 0,
        tmpAvgPriceOfMh = 0;

    for (var i in values) {
        var val = values[i];
        for (var j in val.rows) {
            tmpData.push({
                price: val.rows[j].p,
                machineHorse: val.rows[j].hp
            });
            tmpAvgPriceOfMh += val.rows[j].hp;
            tmpAvgPriceOfCar += val.rows[j].p;
        }
    }

    reduced.rows.push({
        make: key,
        p: 0,
        hp: 0,
        data: tmpData,
        avgNumberOfMh: tmpAvgPriceOfMh,
	avgPriceOfCar: tmpAvgPriceOfCar
    });

    return reduced;
};
```

### Funkcja finalize

Funckja finalizująca która dokonuje statecznych obliczeń, fomatujemy wynik i usuwamy zbędne nam pola rekordów.

```javascript
var fin = function (key, reduced) {

    var result = {
        make: '',
        data: [],
        avgPriceForOneMh: 0
    };

    for (var i in reduced.rows) {
        result.avgPriceForOneMh = reduced.rows[i].avgPriceOfCar / reduced.rows[i].avgNumberOfMh;
	result.data = reduced.rows[i].data;
        result.make = reduced.rows[i].make;
    }

    return result;
};
```

### Przykładowe wywołanie

```javascript
db.Cars.mapReduce(map,
    reduce, {
    out: {
        reduce: 'example'
    },
    finalize: fin
});
```

## Przykład zredukowanych danych:

```json
{
    "_id": "acura",
    "value": {
        "make": "acura",
        "data": [{
                "price": 28855,
                "machineHorse": 225
            }, {
                "price": 19755,
                "machineHorse": 140
            }, {
                "price": 20555,
                "machineHorse": 140
            }, {
                "price": 21405,
                "machineHorse": 140
            }, {
                "price": 21955,
                "machineHorse": 140
            }, {
                "price": 22655,
                "machineHorse": 170
            }, {
                "price": 22955,
                "machineHorse": 170
            }, {
                "price": 24805,
                "machineHorse": 195
            }, {
                "price": 84745,
                "machineHorse": 252
            }, {
                "price": 84745,
                "machineHorse": 290
            }, {
                "price": 84745,
                "machineHorse": 252
            }, {
                "price": 84745,
                "machineHorse": 290
            }, {
                "price": 28855,
                "machineHorse": 210
            }
        ],
        "avgPriceForOneMh": 210.7019892884468
    }
}

```

### Wykres dla części wybranych marek
Na wykresi widać jakiej marki samochód mamy wybrać jeżeli chcemy mieć jak najwięcej mocy w stosunku do ceny samochodu

![Srednia cane 1hp](https://raw.github.com/Socr4tes/map-reduce/master/images/mdubrawa/avg1hp.png)


## Linki
* [Skrypt](/scripts/mapReduce_mdubrawa.js)
