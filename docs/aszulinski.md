# Map Reduce

### Adam Szuliński

Generuję kolekcję religii z obliczoną średnią wieku wyznawców.

### Funkcja Map:
```js
var m = function() {
  emit(
    this.religion,
    {
      first_name: this.first,
      last_name: this.last,
      age: this.age,
      religion: this.religion
    }
  )
}
```

### Funkcja Reduce:

```js
var r = function(religion, people) {
  f = {
    religion: religion,
    quantity: 0,
    avgAge: 0
  };
  var q = 0;
  people.forEach(function (person) {
      f.quantity += 1;
      f.avgAge += person.age;
      q += 1;
    }
  );
  f.avgAge = f.avgAge / q;
  return f;
}

```

### Wynik


![MapReduce wykres](https://github.com/szadams/map-reduce/raw/master/images/wykres_aszulinski.JPG)


Próbka danych wynikowych
```json
{
	"_id" : "cambliste",
	"value" : {
		"religion" : "cambliste",
		"quantity" : 3,
		"avgAge" : 23
	}
}
{
	"_id" : "camelite",
	"value" : {
		"religion" : "camelite",
		"quantity" : 2,
		"avgAge" : 46.5
	}
}
```
