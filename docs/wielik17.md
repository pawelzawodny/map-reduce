### *Damian Wieliczko, 186437*
---
#Wykorzystana baza db.kody_pocztowe

# Map reduce

## Ilość kodów pocztowych w poszczególnych województwach.

# Funkcja map

```js
var map = function() {
        emit(this.wojewodztwo, 1);
};

```

## Funkcja reduce

```js
reduce = function(key, values) {
    return Array.sum(values);
};
```

## Wywołanie mapReduce

```js
db.kody_pocztowe.mapReduce(map,reduce,{ out :{ inline : true }})
```

## Wyniki agregacji

```json
{
	"results" : [
		{
			"_id" : "dolnośląskie",
			"value" : 9529
		},
		{
			"_id" : "kujawsko-pomorskie",
			"value" : 7544
		},
		{
			"_id" : "lubelskie",
			"value" : 6522
		},
		{
			"_id" : "lubuskie",
			"value" : 2687
		},
		{
			"_id" : "mazowieckie",
			"value" : 25182
		},
		{
			"_id" : "małopolskie",
			"value" : 8063
		},
		{
			"_id" : "opolskie",
			"value" : 3823
		},
		{
			"_id" : "podkarpackie",
			"value" : 5865
		},
		{
			"_id" : "podlaskie",
			"value" : 6610
		},
		{
			"_id" : "pomorskie",
			"value" : 8454
		},
		{
			"_id" : "warmińsko-mazurskie",
			"value" : 5460
		},
		{
			"_id" : "wielkopolskie",
			"value" : 12440
		},
		{
			"_id" : "zachodniopomorskie",
			"value" : 7575
		},
		{
			"_id" : "łódzkie",
			"value" : 9968
		},
		{
			"_id" : "śląskie",
			"value" : 15535
		},
		{
			"_id" : "świętokrzyskie",
			"value" : 4819
		}
	],
	"timeMillis" : 1875,
	"counts" : {
		"input" : 140076,
		"emit" : 140076,
		"reduce" : 1019,
		"output" : 16
	},
	"ok" : 1,
}


```
Wykres:
![wykres](https://chart.googleapis.com/chart?chs=318x220&cht=p&chco=FF9900|000000&chds=0,25182&chd=t:9529,7544,6522,2687,25182,8063,3823,5865,6610,8454,5460,12440,7575,9968,15535,4819&chl=dolno%C5%9Bl%C4%85skie|kujawsko-pomorskie|lubelskie|lubuskie|mazowieckie|ma%C5%82opolskie|opolskie|podkarpackie|podlaskie|pomorskie|warmi%C5%84sko-mazurskie|wielkopolskie|zachodniopomorskie|%C5%82%C3%B3dzkie|%C5%9Bl%C4%85skie|%C5%9Bwi%C4%99tokrzyskie&chma=|5)

## Miejscowości zaczynające się na "Duż".

# Funkcja map

```js
map = function() {
    emit( { miejsce: this.miejsce.match(/^Duż/) } ,1);
};
```

## Funkcja reduce

```js
reduce = function(key, values) {
    return Array.sum(values);
};
```

## Wywołanie mapReduce

```js
db.kody_pocztowe.mapReduce(map,reduce,{ out :{ inline : true }})
```

## Wyniki agregacji

```json
{
	"results" : [
		{
			"_id" : {
				"miejsce" : null
			},
			"value" : 140063
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Cerkwica"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Klonia"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Kujawa"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Kępina"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Wólka"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duża Wólka (Bieńków)"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duże Krówno"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duże Wiosło"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duże Wędoły"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duży Dół"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duży Jabłuszek"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duży Las"
				]
			},
			"value" : 1
		},
		{
			"_id" : {
				"miejsce" : [
					"Duż",
					0,
					"Duży Potok"
				]
			},
			"value" : 1
		}
	],
	"timeMillis" : 2936,
	"counts" : {
		"input" : 140076,
		"emit" : 140076,
		"reduce" : 1326,
		"output" : 14
	},
	"ok" : 1,
}
```


//Link do skryptu: [mapreduce_wielik17.js](../scripts/mapreduce_wielik17.js)
