# Kody pocztowe

### *Dorian Sawa*

Użyłem tej samej kolekcji kodów pocztowych co w projekcie z aggregacjami.
MapReduce wykorzystałem do przedstawienia faktycznej liczby kodów pocztowych dla województw.

### Pierwsza funkcja map:

```javascript
var map = function () {
    emit({kod: this.kod, wojewodztwo: this.wojewodztwo}, { count: 1 });
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

### Uruchomienie i pierwsze wyniki:
```
db.zipcodes.mapReduce(map, reduce, { out: 'kody_results'});
```

Stworzyło mi to 'pośrednią' kolekcję, gdzie dokumenty są takiej postaci:
```json
{
	"_id" : {
		"kod" : "00-001",
		"wojewodztwo" : "mazowieckie"
	},
	"value" : {
		"count" : 4
	}
}
{
	"_id" : {
		"kod" : "00-002",
		"wojewodztwo" : "mazowieckie"
	},
	"value" : {
		"count" : 1
	}
}
```

By poprawnie policzyć teraz unikalne wystąpienia kodów, potrzebna będzie kolejna funkcja mapująca.

### Druga funkcja map
```javascript
var map2 = function () {
   emit(this['_id']['wojewodztwo'], {count: 1});
};
```

### Wywołanie na kolekcji pośredniczącej i wyniki:

```
db.kody_results.mapReduce(map2, reduce, { out: 'kody_for_woj_uniq'});
```

Ostateczny wynik:
```
> db.kody_for_woj_uniq.find();
{ "_id" : "dolnośląskie", "value" : { "count" : 1693 } }
{ "_id" : "kujawsko-pomorskie", "value" : { "count" : 958 } }
{ "_id" : "lubelskie", "value" : { "count" : 851 } }
{ "_id" : "lubuskie", "value" : { "count" : 518 } }
{ "_id" : "mazowieckie", "value" : { "count" : 4664 } }
{ "_id" : "małopolskie", "value" : { "count" : 1518 } }
{ "_id" : "opolskie", "value" : { "count" : 622 } }
{ "_id" : "podkarpackie", "value" : { "count" : 523 } }
{ "_id" : "podlaskie", "value" : { "count" : 781 } }
{ "_id" : "pomorskie", "value" : { "count" : 1546 } }
{ "_id" : "warmińsko-mazurskie", "value" : { "count" : 779 } }
{ "_id" : "wielkopolskie", "value" : { "count" : 1722 } }
{ "_id" : "zachodniopomorskie", "value" : { "count" : 1886 } }
{ "_id" : "łódzkie", "value" : { "count" : 1869 } }
{ "_id" : "śląskie", "value" : { "count" : 1088 } }
{ "_id" : "świętokrzyskie", "value" : { "count" : 629 } }
```
![](../images/dsawa/dsawa_diagram.png)

### Plik JS z komendami
[Klik](/scripts/mapreduce_dsawa.js)
