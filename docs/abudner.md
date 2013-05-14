# Map Reduce Adresów IP

Dla każdego województwa wyliczam ilość klas adresów IP.

## Funkcja map

```js
var map = function() {
		emit(this.regionName, 1);
};
```

## Funkcja reduce

```js
var reduce = function(key, val) {
		var count = 0;
		for(i=0;i<val.length; i++) {
			count += val[i];
		}
		return count;
};
```

## Map Reduce na kolekcji adresyip

```js
db.adresyip.mapReduce(
	map,
	reduce,
	{ out : "result" }
);
```

## Wyniki agregacji

```json
{ "_id" : "-", "value" : 14 }
{ "_id" : "DOLNOSLASKIE", "value" : 27 }
{ "_id" : "KUJAWSKO-POMORSKIE", "value" : 16 }
{ "_id" : "LODZKIE", "value" : 20 }
{ "_id" : "LUBELSKIE", "value" : 23 }
{ "_id" : "LUBUSKIE", "value" : 6 }
{ "_id" : "MALOPOLSKIE", "value" : 44 }
{ "_id" : "MAZOWIECKIE", "value" : 235 }
{ "_id" : "OPOLSKIE", "value" : 3 }
{ "_id" : "OVERIJSSEL", "value" : 1 }
{ "_id" : "PODKARPACKIE", "value" : 12 }
{ "_id" : "PODLASKIE", "value" : 17 }
{ "_id" : "POMORSKIE", "value" : 42 }
{ "_id" : "SLASKIE", "value" : 53 }
{ "_id" : "SWIETOKRZYSKIE", "value" : 5 }
{ "_id" : "WARMINSKO-MAZURSKIE", "value" : 6 }
{ "_id" : "WIELKOPOLSKIE", "value" : 40 }
{ "_id" : "ZACHODNIOPOMORSKIE", "value" : 27 } 
```

## Wykres

<img src="http://chart.googleapis.com/chart?chxr=0,0,250&chxt=x&chbh=a&chs=600x450&cht=bhg&chco=7777CC,3D7930,FF9900,3072F3,80C65A,FF0000,F044D3,2CACB7,EEFF00,9942C5,99FF00,895735,757F74,0EEEC1,7B3456&chds=0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250,0,250&chd=t:27|16|20|23|44|235|3|12|17|42|53|5|6|40|27&chdl=Dolno%C5%9Bl%C4%85skie|Kujawsko-Pomorskie|%C5%81%C3%B3dzkie|Lubelskie|Ma%C5%82opolskie|Mazowieckie|Opolskie|Podkarpackie|Podlaskie|Pomorskie|%C5%9Al%C4%85skie|%C5%9Awi%C4%99tokrzyskie|Warmi%C5%84sko-Mazurskie|Wielkopolskie|Zachodniopomorskie&chtt=Ilo%C5%9B%C4%87+klas+adres%C3%B3w+IP+w+wojew%C3%B3dztwach" />

## Skrypt
* [Skrypt](/scripts/mapreduce_abudner.js)