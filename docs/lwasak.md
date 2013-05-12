# Map Reduce na Cenach Towarów i Usług

Agreguje i redukuje dane dla konkretnego towaru. Towar jest aggregowany według województwa i nastepnie redukowany do postaci jednego rekordu. Obliczana jest średnia cen danego towaru w województwie.

Orginalne dane:

```json
{
    "_id": ObjectId("516549cd4886585c3ada4420"),
    "towar": "ryż",
    "ilosc": 1,
    "jednostka_miary": "kg",
    "rok": 2003,
    "waluta": "zł",
    "region": "POMORSKIE",
    "cena": 1.93
} 
{
    "_id": ObjectId("516549cd4886585c3ada4421"),
    "towar": "ryż",
    "ilosc": 1,
    "jednostka_miary": "kg",
    "rok": 2004,
    "waluta": "zł",
    "region": "POMORSKIE",
    "cena": 2.52
} 
{
    "_id": ObjectId("516549cd4886585c3ada4422"),
    "towar": "ryż",
    "ilosc": 1,
    "jednostka_miary": "kg",
    "rok": 2005,
    "waluta": "zł",
    "region": "POMORSKIE",
    "cena": 2.69
}
```

Wygląd danych po map-reduce:

```json
{
    "_id": "POMORSKIE",
    "value": {
        "region": "POMORSKIE",
        "dane": [
			{
                "cena": 0,
                "rok": 0
            }, 
			{
                "cena": 1.93,
                "rok": 2003
            }, 
			{
                "cena": 2.52,
                "rok": 2004
            }, 
			{
                "cena": 2.69,
                "rok": 2005
            }, 
			{
                "cena": 2.58,
                "rok": 2006
            }, 
			{
                "cena": 2.85,
                "rok": 2007
            }, 
			{
                "cena": 4.05,
                "rok": 2008
            }, 
			{
                "cena": 4.82,
                "rok": 2009
            }, 
			{
                "cena": 4.43,
                "rok": 2010
            }, 
			{
                "cena": 4.09,
                "rok": 2011
            }
        ],
        "sredniaCena": 1.1096296296296297
    }
}
```

### Funkcja map

Aggreguje ona dane na temat towaru wedlug regionów.

```javascript
var map = function () {
    emit(this.region, {
        rows: [{
                reg: this.region,
                c: this.cena,
                r: this.rok,
                data: [],
                avgPrice: 0,
                count: 1
            }
        ]
    });
};
```

### Funkcja reduce

Redukuje z aggregowane dane po regionach do jednego rekordu.

```javascript
var reduce = function (key, values) {
    var reduced = {
        rows: []
    }, tmpData = [],
        tmpCount = 0,
        tmpAvgPrice = 0;

    for (var i in values) {
        var val = values[i];
        for (var j in val.rows) {
            tmpData.push({
                cena: val.rows[j].c,
                rok: val.rows[j].r
            });
            tmpAvgPrice += val.rows[j].c;
            tmpCount += val.rows[j].count;
        }
    }

    reduced.rows.push({
        reg: key,
        c: 0,
        r: 0,
        data: tmpData,
        avgPrice: tmpAvgPrice,
        count: tmpCount
    });

    return reduced;
};
```

### Funkcja finalize

Dokonujemy w niej ostatecznych obliczeń, fomatujemy wynik i usuwamy zbędne nam pola rekordów.

```javascript
var fin = function (key, reduced) {

    var result = {
        region: '',
        dane: [],
        sredniaCena: 0
    };

    for (var i in reduced.rows) {
        if (reduced.rows[i].count > 0) {
            result.sredniaCena = reduced.rows[i].avgPrice / reduced.rows[i].count;
        }

        result.dane = reduced.rows[i].data;
        result.region = reduced.rows[i].reg;
    }

    return result;
};
```

### Map Reduce na kolekcji Prices

Odpalamy map-reduce na kolekcji "Prices" dla konkretnego zastwu rekorów. Wybieramy taki zestaw który reprezentuje nasz towar który chcemy z aggregować. Wynik map-reduce bedzie przechowywany w kolekcji "example".
Tutaj mamy przykład map-reduce dla towaru - "ryż".

```javascript
db.Prices.mapReduce(map,
    reduce, {
    query: {
        towar: 'ryż'
    },
    out: {
        reduce: 'example'
    },
    finalize: fin
});
```

Statystyka mapowań i redukcji:

```javascript
{
    "result": "example",
    "timeMillis": 1472,
    "counts": {
        "input": 621,
        "emit": 621,
        "reduce": 49,
        "output": 23
    },
    "ok": 1,
}
```

### Przykładowa reprezentacja danych w postaci wykresu.

<img src="http://chart.apis.google.com/chart?cht=bvs&chs=1000x300&chd=t:2.14,2.10,1.21,2.01,2.05,1.10&chds=0,3&chbh=50,80&chco=0000ff&chxt=x,y&chxl=0:|DOLNO%C5%9AL%C4%84SKIE|LUBUSKIE|MAZOWIECKIE|OPOLSKIE|PODLASKIE|POMORSKIE|1:||0.5|1|1.5|2|2.5|3" />

## Linki
* [Skrypt](/scripts/mapReduce_lwasak_Ceny.js)