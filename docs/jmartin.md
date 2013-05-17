### *Jakub Martin, 186408*
---

# Map reduce

### *db.imieniny*

Wynikiem jest przekształcenie dokumentów tak, aby "kluczem" było imię, a nie data.

Dokument przed:

```json
{
  "_id" : ObjectId("51783d04597c338390d5c64b"),
  "names" : [
    "Piotra",
    "MaĹgorzaty"
  ],
  "date" : "18/01"
}
```

Dokument po:

```json
{
  "_id" : "Alicji", 
  "value" : { 
    "dates" : [ 
      "21/06", 
      "16/12" 
    ] 
  }
}

```

#### Przygotowania

* pobranie danych

```sh
wget https://raw.github.com/nosql/data-refine/master/data/csv/imieniny.csv
```

* import do mongo

```sh
mongoimport --drop --headerline --type csv --collection imieniny < imieniny.csv
```

* zmiana formatu danych w rubym

```ruby
require 'mongo'
include Mongo

db = MongoClient.new("localhost", 27017, w: 1, wtimeout: 200, j: true).db("test")
coll = db.collection("imieniny")

coll.find({}, {snapshot: true}).each do |doc|
  doc["names"] = doc["names"].split(" ")
  doc["date"] = "%02d/%02d" % [doc["day"], doc["month"]]
  doc.delete("day") ; doc.delete("month")
  coll.save(doc)
end
```

#### Map reduce

* funkcja map

```js
var map = function() {

    var that = this;
    
    this.names.forEach(function(word) {
        emit(word, {dates : [that.date]});
    });
    
} 
```

* funkcja reduce

```js
var reduce = function(key, values) {

  var temp = [];
  
  for(i in values) {
      temp.push(values[i].dates[0]);
  }

  return {dates : temp};
  
}
```

* wywołanie

```js
db.imieniny.mapReduce(map, reduce, {out : "result"});
```

Wyniki znajdują się w kolekcji "result". Przykładowe pobrania dokumetów:

```js
db.result.findOne()
db.result.findOne({"_id" : "Jakuba"}).value.dates
```

Dzięki powyższym działaniom otrzymujemy alfabetyczną liczbę imion wraz z datami imienin:

| Imię | Imieniny |
|:---:|:---:|
| Achillesa | 12/05 |
| Adama | 24/12 |
| Adelajdy | 05/02 |
| Adelii | 23/11 |
| Adolfa | 19/04 |
| Adriana | 05/03 |
| Adrianny | 08/09 |
| Ady | 12/12 |
| Agaty | 05/02 |
| Agnieszki | 21/01 , 06/03 , 20/04 |
| Aidy | 28/07 |
| Alberta | 17/06 , 15/11 |
| ... | ...|

Link do skryptu: [mapreduce_jmartin.js](/scripts/mapreduce_jmartin.js)
