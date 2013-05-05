# Kody pocztowe

Za pomocą funkcji map:
```php
$map = new MongoCode("function() { emit(this.wojewodztwo,1); }");
```

oraz reduce:

```php
$reduce = new MongoCode("function(k, val) { var count = 0;
 for(i in val){
 count += val[i]; }
 return count; }");
```

Generuję ilość kodów pocztowych w każdym województwie.

Wynik:

```
array(2) {
  ["_id"]=>
  string(0) ""
  ["value"]=>
  float(8)
}
array(2) {
  ["_id"]=>
  string(14) "dolnośląskie"
  ["value"]=>
  float(1560)
}
array(2) {
  ["_id"]=>
  string(18) "kujawsko-pomorskie"
  ["value"]=>
  float(872)
}
array(2) {
  ["_id"]=>
  string(9) "lubelskie"
  ["value"]=>
  float(789)
}
array(2) {
  ["_id"]=>
  string(8) "lubuskie"
  ["value"]=>
  float(490)
}
array(2) {
  ["_id"]=>
  string(11) "mazowieckie"
  ["value"]=>
  float(4432)
}
array(2) {
  ["_id"]=>
  string(12) "małopolskie"
  ["value"]=>
  float(1431)
}
array(2) {
  ["_id"]=>
  string(8) "opolskie"
  ["value"]=>
  float(627)
}
array(2) {
  ["_id"]=>
  string(12) "podkarpackie"
  ["value"]=>
  float(472)
}
array(2) {
  ["_id"]=>
  string(9) "podlaskie"
  ["value"]=>
  float(722)
}
array(2) {
  ["_id"]=>
  string(9) "pomorskie"
  ["value"]=>
  float(1484)
}
array(2) {
  ["_id"]=>
  string(20) "warmińsko-mazurskie"
  ["value"]=>
  float(770)
}
array(2) {
  ["_id"]=>
  string(13) "wielkopolskie"
  ["value"]=>
  float(1628)
}
array(2) {
  ["_id"]=>
  string(18) "zachodniopomorskie"
  ["value"]=>
  float(1857)
}
array(2) {
  ["_id"]=>
  string(9) "łódzkie"
  ["value"]=>
  float(1795)
}
array(2) {
  ["_id"]=>
  string(9) "śląskie"
  ["value"]=>
  float(1055)
}
array(2) {
  ["_id"]=>
  string(16) "świętokrzyskie"
  ["value"]=>
  float(601)
}
```