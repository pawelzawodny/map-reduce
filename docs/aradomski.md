# Kody pocztowe

### *Adam Radomski*


### Funkcja map:

```javascript
var map = function() {
    emit({powiat: this.powiat}, { count: 1 });
};
```


### Funkcja Reduce:

```javascript
var reduce = function (key, values) {
    var count = 0;
    values.forEach(function (v) {
        count += v['count'];
    });
    return {count: count};
};
```

### Uruchamianie 

```
db.kody_pocztowe.mapReduce(map,reduce,{ out : 'powiaty'})
```

###	Fragment wyniku

```
{ "_id" : { "powiat" : "aleksandrowski" }, "value" : { "count" : 162 } }
{ "_id" : { "powiat" : "augustowski" }, "value" : { "count" : 256 } }
{ "_id" : { "powiat" : "bartoszycki" }, "value" : { "count" : 274 } }
{ "_id" : { "powiat" : "bełchatowski" }, "value" : { "count" : 337 } }
{ "_id" : { "powiat" : "bialski" }, "value" : { "count" : 424 } }
{ "_id" : { "powiat" : "białobrzeski" }, "value" : { "count" : 185 } }
{ "_id" : { "powiat" : "białogardzki" }, "value" : { "count" : 137 } }
{ "_id" : { "powiat" : "białostocki" }, "value" : { "count" : 865 } }
{ "_id" : { "powiat" : "bielski" }, "value" : { "count" : 749 } }
{ "_id" : { "powiat" : "bieruńsko-lędziński" }, "value" : { "count" : 175 } }
{ "_id" : { "powiat" : "bieszczadzki" }, "value" : { "count" : 86 } }
{ "_id" : { "powiat" : "biłgorajski" }, "value" : { "count" : 242 } }
{ "_id" : { "powiat" : "bocheński" }, "value" : { "count" : 171 } }
{ "_id" : { "powiat" : "bolesławiecki" }, "value" : { "count" : 107 } }
{ "_id" : { "powiat" : "braniewski" }, "value" : { "count" : 328 } }
{ "_id" : { "powiat" : "brodnicki" }, "value" : { "count" : 288 } }
{ "_id" : { "powiat" : "brzeski" }, "value" : { "count" : 500 } }
{ "_id" : { "powiat" : "brzeziński" }, "value" : { "count" : 131 } }
{ "_id" : { "powiat" : "brzozowski" }, "value" : { "count" : 229 } }
{ "_id" : { "powiat" : "buski" }, "value" : { "count" : 243 } }

```

### Fragment wykresu

![](../images/radomski.png)


### [Plik JS z komendami](/scripts/mapReduce_aradomski.js)
