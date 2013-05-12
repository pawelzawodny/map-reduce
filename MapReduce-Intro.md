# Wprowadzenie do MapReduce

1. Co to jest platforma obliczeniowa MapReduce?
   [link](http://wbzyl.inf.ug.edu.pl/nosql/mongodb-mapreduce)
2. W jakim języku programujemy funkcje *map* i funkcje *reduce*?
   [link](https://github.com/languages)
3. Marijn Haverbeke,
   [Eloquent JavaScript](http://www.bt4.pl/kursy/javascript/wszystko-jasne/)
4. Proste MapReduce najczęściej wyliczają statystyki (średnie, sumy)
   zebranych danych. Klasyczny przykład – zliczanie liczby słów.
5. Jak przedstawić wyniki obliczeń MapReduce:
  - [Data-Driven Documents](http://d3js.org/)
  - Włodzimierz Gajda,
    [Google Chart API — prosty sposób umieszczania wykresów na stronach WWW](http://gajdaw.pl/varia/google-chart-api/print.html)


## Proste MapReduce

Korzystając z konsoli *mongo* łaczymy się z bazą:

```sh
mongo --username student --password sesja2013 153.19.1.202/test
```

W bazie *test* kolekcji *phrases* zostały zapisane dwa dokumenty:

```javascript
db.phrases.insert({ _id: 1, filename: "hamlet.txt",  content: "to be or not to be" });
db.phrases.insert({ _id: 2, filename: "phrases.txt", content: "to wit" });
```

Na konsoli mongo wkeljamy kod funkcji map (*m*) i funkcji reduce (*r*)
wykonującej obliczenia na tych dwóch dokumentach:

```js
m = function() {
  this.content.match(/[a-z]+/g).forEach(function(word) {
    emit(word, 1);
  });
};
r = function(key, values) {
  return Array.sum(values);
};
```

Następnie uruchamiamy obliczenia MapReduce:

```js
db.phrases.mapReduce(m, r, {out: {inline: 1}});
{
  "results": [
    { "_id": "be",  "value": 2 },
    { "_id": "not", "value": 1 },
    { "_id": "or",  "value": 1 },
    { "_id": "to",  "value": 3 },
    { "_id": "wit", "value": 1 }
  ],
  "timeMillis": 24,
  "counts": {
    "input": 2, "emit": 8, "reduce": 2, "output": 5
  },
  "ok": 1,
}
```

Albo możemy zapamiętać wyniki w zmiennej:

```js
var res = coll.mapReduce(m, r, {out: {inline: 1}});
```


## Jakaś grafika?

![częstości występowania słów](http://chart.apis.google.com/chart?cht=bhs&chs=400x150&chd=t:2,1,1,3,1|0,0,0,0,0&chbh=20,10&chds=0,3)

Wykres powyżej powstał przy użyciu następujących
[parametrów](https://developers.google.com/chart/image/docs/gallery/bar_charts?hl=pl):

```
cht=bhs                                // typ wykresu: bar chart stacked
chs=400x150                            // wymiary wykresu: 150 == 5*(20+10)
chd=t:2,1,1,3,1|0,0,0,0                // dane wykresu

chco=4d89f9,c6d9fd                     // kolory
chxt=y,x                               // osie
chxl=0:|be|not|or|to|wit|1:|0|1|2|3|4| // etykiety
chbh=20,10                             // szerokości i odstępy słupków
chds=0,3                               // przeskaluj [0,3] -> [0,400]
```

Wygenerowany URL:

```
http://chart.apis.google.com/chart?cht=bhs&chs=400x150&chd=t:2,1,1,3,1|0,0,0,0,0&chbh=20,10&chds=0,3
```

Zobacz też [Chart Wizard](https://developers.google.com/chart/image/docs/chart_wizard).
