### *Pawel Zawodny*

Kilometry agregowane wedlug zwyciezcow

### funkcja map

```js
var map = function() {
    emit(this.zwyciezca, this.km);
};

var reduce = function(key, value) {
    return Array.sum(value);
};



db.tdf.mapReduce(map, reduce);
```

### wynik częsć


```json
{ "_id" : "Lance Armstrong", "value" : 3.68 }
{ "_id" : "Alberto Contador", "value" : 3.57 }
{ "_id" : "Cadel Evans", "value" : 3.43 }
```

![mapreduce](../images/pzawodny.png)



