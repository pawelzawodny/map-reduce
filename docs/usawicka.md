# Map Reduce dla najpopularnejszych nazw produktów

Wykorzystałam projekt, w którym wykonałam poprzednio agregacje.

[Aplikacja z agregacjami i map reduce](https://github.com/urszulasawicka/aggregation-demo)

Najpierw wykonuję polecenie na wcześniejszej kolekcji vend. Pobieram nazwy wykluczając domyślną wartość "unknown".

```js
var command = {
    mapreduce: "vend",
    query: {
        name: {
            $ne: "unknown"
        }
    },
    map: m.toString(),
    reduce: r.toString(),
    sort: {
        name: 1
    },
    out: "counted"
};
```

Na nazwach wykonywane jest map oraz reduce.

```js
m = function () {
    this.name.match(/[A-Z]?[a-z]+/g).forEach(function (word) {
        emit(word, 1);
    });
};

r = function (old, actual) {
    var count = 0;
    for (index in actual) {
        count += actual[index];
    }
    return count;
};
```

Wynik map oraz reduce trafia do kolekcji counted.
Polecenie wykonuję za pomocą Mongoose.

```js
db.db.executeDbCommand(command, function (err, dbres) {
    console.log('Map reduce: ');
});
```

Na końcu pobieram wyniki z kolekcji counted dla wartości większych od 2 i przesyłam do widoku aplikacji.

```js
db.db.collection('counted', function (err, collection) {
    collection.find({
        value: {
            $gte: 2
        }
    }).sort({
        'value': 1
    })
        .limit(100).toArray(function (err, vends) {
        res.send(JSON.stringify(vends));
    });

});
```

Wynik map-reduce:

Najpopularniejsza okazała się Cola.

```json
{"_id":"Cola","value":26}
```

A najmniej popularne okazały się Jeansy.

```json
{"_id":"Jeans","value":2}
```
