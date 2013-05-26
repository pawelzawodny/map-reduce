## Średnia liczba kodów pocztowych w województwie

### *Michał Mroczkowski*

### Próbka danych:

```json
{
        "_id" : ObjectId("51952923cae8ed75cd2088b0"),
        "gminy" : "Warszawa",
        "id" : "17189",
        "kod" : "00-040",
        "kod_int" : "40",
        "liczba_gmin" : "1",
        "liczba_powiatow" : "1",
        "miejscowosci_str" : "Warszawa (Śródmieście)",
        "wojewodztwo" : "mazowieckie",
        "wojewodztwo_id" : "7"
}
{
        "_id" : ObjectId("51952923cae8ed75cd2088b1"),
        "gminy" : "Warszawa",
        "id" : "16813",
        "kod" : "00-041",
        "kod_int" : "41",
        "liczba_gmin" : "1",
        "liczba_powiatow" : "1",
        "miejscowosci_str" : "Warszawa (Śródmieście)",
        "wojewodztwo" : "mazowieckie",
        "wojewodztwo_id" : "7"
}
```

### Map:

```javascript
var map = function() {
	emit(this.wojewodztwo,{kody: [this.kod], miasta: [this.miejscowosci_str]});
};
```

### Reduce:

```javascript
var reduce = function(key, val) {
	var res = {kody:[], miasta:[]};
	val.forEach(function (value) {
		res.kody = value.kody.concat(res.kody);
		res.miasta = value.miasta.concat(res.miasta);
	});
	return res;
};
```

### Finalize:

```javascript
var finalize = function(key, res) {
	var countKody = res.kody.length, countMiasta = 0, uniq = {};
	res.miasta.forEach(function (value) {
		if(!uniq[value]) {
			uniq[value] = value;
			countMiasta++;
		}
	});
	res.iloscMiast = countMiasta;
	res.iloscKodowPocztowych = countKody;
	res.srednia = Number(countKody / countMiasta).toFixed(2);
    delete res.miasta;
    delete res.kody;
    return res;
};
```


### Wynik:

```json
{
	"_id" : "",
	"value" : {
		"iloscMiast" : 8,
		"iloscKodowPocztowych" : 8,
		"srednia" : "1.00"
	}
}
{
	"_id" : "dolnośląskie",
	"value" : {
		"iloscMiast" : 308,
		"iloscKodowPocztowych" : 1560,
		"srednia" : "5.06"
	}
}
{
	"_id" : "kujawsko-pomorskie",
	"value" : {
		"iloscMiast" : 209,
		"iloscKodowPocztowych" : 872,
		"srednia" : "4.17"
	}
}
{
	"_id" : "lubelskie",
	"value" : {
		"iloscMiast" : 228,
		"iloscKodowPocztowych" : 789,
		"srednia" : "3.46"
	}
}
{
	"_id" : "lubuskie",
	"value" : {
		"iloscMiast" : 137,
		"iloscKodowPocztowych" : 490,
		"srednia" : "3.58"
	}
}
{
	"_id" : "mazowieckie",
	"value" : {
		"iloscMiast" : 448,
		"iloscKodowPocztowych" : 4432,
		"srednia" : "9.89"
	}
}
{
	"_id" : "małopolskie",
	"value" : {
		"iloscMiast" : 382,
		"iloscKodowPocztowych" : 1431,
		"srednia" : "3.75"
	}
}
{
	"_id" : "opolskie",
	"value" : {
		"iloscMiast" : 150,
		"iloscKodowPocztowych" : 627,
		"srednia" : "4.18"
	}
}
{
	"_id" : "podkarpackie",
	"value" : {
		"iloscMiast" : 328,
		"iloscKodowPocztowych" : 472,
		"srednia" : "1.44"
	}
}
{
	"_id" : "podlaskie",
	"value" : {
		"iloscMiast" : 130,
		"iloscKodowPocztowych" : 722,
		"srednia" : "5.55"
	}
}
{
	"_id" : "pomorskie",
	"value" : {
		"iloscMiast" : 240,
		"iloscKodowPocztowych" : 1484,
		"srednia" : "6.18"
	}
}
{
	"_id" : "warmińsko-mazurskie",
	"value" : {
		"iloscMiast" : 133,
		"iloscKodowPocztowych" : 770,
		"srednia" : "5.79"
	}
}
{
	"_id" : "wielkopolskie",
	"value" : {
		"iloscMiast" : 421,
		"iloscKodowPocztowych" : 1628,
		"srednia" : "3.87"
	}
}
{
	"_id" : "zachodniopomorskie",
	"value" : {
		"iloscMiast" : 237,
		"iloscKodowPocztowych" : 1857,
		"srednia" : "7.84"
	}
}
{
	"_id" : "łódzkie",
	"value" : {
		"iloscMiast" : 192,
		"iloscKodowPocztowych" : 1795,
		"srednia" : "9.35"
	}
}
{
	"_id" : "śląskie",
	"value" : {
		"iloscMiast" : 296,
		"iloscKodowPocztowych" : 1055,
		"srednia" : "3.56"
	}
}
{
	"_id" : "świętokrzyskie",
	"value" : {
		"iloscMiast" : 105,
		"iloscKodowPocztowych" : 601,
		"srednia" : "5.72"
	}
}
```

### Wykres

![Wykres](https://raw.github.com/nosql/map-reduce/master/images/mmroczkowski-wykres.png)


```
//chart.googleapis.com/chart
   ?chs=560x460
   &cht=map:auto=0,0,0,10
   &chco=B3BCC0|3366CC|DC3912|FF9900|109618|990099|0099C6|DD4477|66AA00|B82E2E|316395|994499|AAAA11|6633CC|E67300|8B0707|651067
   &chld=PL-DS|PL-KP|PL-PM|PL-LU|PL-PD|PL-MA|PL-LB|PL-LD|PL-MZ|PL-OP|PL-PK|PL-SL|PL-SK|PL-WN|PL-WP|PL-ZP
   &chdl=Dolnośląskie|Kujawsko-Pomorskie|Pomorskie|Lubelskie|Podlaskie|Małopolskie|Lubuskie|Łódzkie|Mazowieckie|Opolskie|Podkarpackie|Śląskie|Świętokrzyskie|Warmińsko-Mazurskie|Wielkopolskie|Zachodniopomorskie
   &chm=f4.17,FF0000,0,1,10|f5.06,FF0000,0,0,10|f6.18,FF0000,0,2,10|f3.46,FF0000,0,3,10|f5.55,FF0000,0,4,10|f3.75,FF0000,0,5,10|f3.58,FF0000,0,6,10|f9.35,FF0000,0,7,10|f9.89,FF0000,0,8,10|f4.18,FF0000,0,9,10|f1.44,FF0000,0,10,10|f3.56,FF0000,0,11,10|f5.72,FF0000,0,12,10|f5.79,FF0000,0,13,10|f3.87,FF0000,0,14,10|f7.84,FF0000,0,15,10
   &chtt=Średnia+liczba+kodów+pocztowych+w+województwach
```

### Skrypt

[Skrypt](/scripts/mapreduce_mmroczkowski.js)

## Liczba gmin w województwach

### Map

```javascript
var map = function() {
	emit(this.wojewodztwo, {gminy: [this.gminy]});
};
```

### Reduce

```javascript
var reduce = function(key, val) {
	var res = { gminy: [] };
	val.forEach(function(value) {
		res.gminy = value.gminy.concat(res.gminy);
	});
	return res;
};
```

### Finalize

```javascript
var finalize = function(key, res) {
	var countGminy = 0, uniq = {};
	res.gminy.forEach(function(value) {
		if(!uniq[value]) {
			uniq[value] = value;
			countGminy++;
		}
	});
	res.iloscGmin = countGminy;
    delete res.gminy;
    return res;
};
```

### Wynik

```json
{ "_id" : "", "value" : { "iloscGmin" : 8 } }
{ "_id" : "dolnośląskie", "value" : { "iloscGmin" : 184 } }
{ "_id" : "kujawsko-pomorskie", "value" : { "iloscGmin" : 152 } }
{ "_id" : "lubelskie", "value" : { "iloscGmin" : 205 } }
{ "_id" : "lubuskie", "value" : { "iloscGmin" : 88 } }
{ "_id" : "mazowieckie", "value" : { "iloscGmin" : 354 } }
{ "_id" : "małopolskie", "value" : { "iloscGmin" : 200 } }
{ "_id" : "opolskie", "value" : { "iloscGmin" : 86 } }
{ "_id" : "podkarpackie", "value" : { "iloscGmin" : 184 } }
{ "_id" : "podlaskie", "value" : { "iloscGmin" : 110 } }
{ "_id" : "pomorskie", "value" : { "iloscGmin" : 165 } }
{ "_id" : "warmińsko-mazurskie", "value" : { "iloscGmin" : 108 } }
{ "_id" : "wielkopolskie", "value" : { "iloscGmin" : 246 } }
{ "_id" : "zachodniopomorskie", "value" : { "iloscGmin" : 144 } }
{ "_id" : "łódzkie", "value" : { "iloscGmin" : 166 } }
{ "_id" : "śląskie", "value" : { "iloscGmin" : 181 } }
{ "_id" : "świętokrzyskie", "value" : { "iloscGmin" : 102 } }
```
### Wykres
![Wykres](https://raw.github.com/nosql/map-reduce/master/images/mmroczkowski-liczba-gmin.png)

```
//chart.googleapis.com/chart
   ?chs=560x520
   &cht=map:auto=0,0,0,10
   &chco=B3BCC0|3366CC|DC3912|FF9900|109618|990099|0099C6|DD4477|66AA00|B82E2E|316395|994499|AAAA11|6633CC|E67300|8B0707|651067
   &chld=PL-DS|PL-KP|PL-PM|PL-LU|PL-PD|PL-MA|PL-LB|PL-LD|PL-MZ|PL-OP|PL-PK|PL-SL|PL-SK|PL-WN|PL-WP|PL-ZP
   &chdl=Dolnośląskie|Kujawsko-Pomorskie|Pomorskie|Lubelskie|Podlaskie|Małopolskie|Lubuskie|Łódzkie|Mazowieckie|Opolskie|Podkarpackie|Śląskie|Świętokrzyskie|Warmińsko-Mazurskie|Wielkopolskie|Zachodniopomorskie
   &chm=f152,FF0000,0,1,10|f184,FF0000,0,0,10|f165,FF0000,0,2,10|f205,FF0000,0,3,10|f110,FF0000,0,4,10|f200,FF0000,0,5,10|f88,FF0000,0,6,10|f166,FF0000,0,7,10|f354,FF0000,0,8,10|f86,FF0000,0,9,10|f184,FF0000,0,10,10|f181,FF0000,0,11,10|f102,FF0000,0,12,10|f108,FF0000,0,13,10|f246,FF0000,0,14,10|f144,FF0000,0,15,10
   &chtt=Liczba+gmin+w+województwach
```

### Skrypt

[Skrypt](/scripts/mapreduce2_mmroczkowski.js)