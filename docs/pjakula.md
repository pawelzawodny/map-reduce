## GeoNames

### *Przemysław Jakuła*

## Wstępny opis:

Dane zostały zaciągnięte ze strony [http://download.geonames.org/export/dump/]. 

Dane dotyczą różnych miejsc na świecie, uwzględniając kraje, stolice, miasta/wsie, populacje miast/wsi, ulice, autostrady, miasta już nieistniejące, rzeki itd. Wszystko w skali świata.

Z danych postanowiłem wyciągnąć "country, state, region, city, village, road, railroad" (razem: 3 510 451 rekordów po przetworzeniu)

## Przykładowe dane:
```json
{
	"id" : 1732787,
	"name" : "Gdansk",
	"latitude" : 54.35205,
	"longitude" : 18.64637,
	"feature_class" : "P",
	"feature_code" : "PPLA",
	"country_code" : "PL",
	"cc2" : null,
	"admin1_code" : 82,
	"admin2_code" : 2261,
	"admin3_code" : 226101,
	"admin4_code" : null,
	"population" : 461865,
	"elevation" : null,
	"dem" : 7,
	"timezone" : "Europe/Warsaw",
	"modification_date" : "2011-10-14"
}
```

[Pełne dane po przetworzeniu na google-drive ze względu na ich wielkość (ok. 1GB)](https://drive.google.com/folderview?id=0B4yVP4J-xy3wLTRtNXA1U244Y0E&usp=sharing)

## Map reduce

Kraje świata z większą populacją od Polski.

### Pobranie populacji Polski:
```js
var PLPOP = db.region.find({feature_class: "A", feature_code: "PCLI", name: "Republic of Poland"});
```
### Funkcja map:
```js
var map = function() {
	if ( this.feature_class=="A" && this.feature_code=="PCLI" && this.population>=pl_pop)
		emit(this.name, {population: this.population});
};
```
### Funkcja reduce:
```js
var reduce = function(key, values) {
	var res = { population:[] };
	values.forEach(function(val) {
		res.population = val.population;
	});
	return res;
};
```
### Funkcja finalize:
```js
var finalize = function(key, res) {
	return res;
};
```
### Przykładowe uruchomienie:
```js
var count = db.region.mapReduce(map, reduce, 
	{out:"result", finalize:finalize, scope: 
		{pl_pop: (PLPOP.hasNext() ? PLPOP.next().population : 10000000)} 
	} 
);
db[count.result].find()
```

### Wynik wywołania:
```json
{ "_id" : "Arab Republic of Egypt", "value" : { "population" : 80471869 } }
{ "_id" : "Argentine Republic", "value" : { "population" : 41343201 } }
{ "_id" : "Bangladesh", "value" : { "population" : 156118464 } }
{ "_id" : "Democratic Republic of the Congo", "value" : { "population" : 70916439 } }
{ "_id" : "Federal Democratic Republic of Ethiopia", "value" : { "population" : 88013491 } }
{ "_id" : "Federal Republic of Germany", "value" : { "population" : 81802257 } }
{ "_id" : "Federal Republic of Nigeria", "value" : { "population" : 154000000 } }
{ "_id" : "Federative Republic of Brazil", "value" : { "population" : 201103330 } }
{ "_id" : "Islamic Republic of Iran", "value" : { "population" : 76923300 } }
{ "_id" : "Islamic Republic of Pakistan", "value" : { "population" : 184404791 } }
{ "_id" : "Japan", "value" : { "population" : 127288000 } }
{ "_id" : "Kingdom of Spain", "value" : { "population" : 46505963 } }
{ "_id" : "Kingdom of Thailand", "value" : { "population" : 67089500 } }
{ "_id" : "Mexico", "value" : { "population" : 112468855 } }
{ "_id" : "People's Republic of China", "value" : { "population" : 1330044000 } }
{ "_id" : "Repubblica Italiana", "value" : { "population" : 60340328 } }
{ "_id" : "Republic of Colombia", "value" : { "population" : 44205293 } }
{ "_id" : "Republic of France", "value" : { "population" : 64768389 } }
{ "_id" : "Republic of India", "value" : { "population" : 1173108018 } }
{ "_id" : "Republic of Indonesia", "value" : { "population" : 242968342 } }
{ "_id" : "Republic of Kenya", "value" : { "population" : 40046566 } }
{ "_id" : "Republic of Korea", "value" : { "population" : 48422644 } }
{ "_id" : "Republic of Poland", "value" : { "population" : 38500000 } }
{ "_id" : "Republic of South Africa", "value" : { "population" : 49000000 } }
{ "_id" : "Republic of Turkey", "value" : { "population" : 77804122 } }
{ "_id" : "Republic of the Philippines", "value" : { "population" : 99900177 } }
{ "_id" : "Russian Federation", "value" : { "population" : 140702000 } }
{ "_id" : "Socialist Republic of Vietnam", "value" : { "population" : 89571130 } }
{ "_id" : "Ukraine", "value" : { "population" : 45415596 } }
{ "_id" : "Union of Burma", "value" : { "population" : 53414374 } }
{ "_id" : "United Kingdom of Great Britain and Northern Ireland", "value" : { "population" : 62348447 } }
{ "_id" : "United Republic of Tanzania", "value" : { "population" : 41892895 } }
{ "_id" : "United States", "value" : { "population" : 310232863 } }
```

## Pola tabeli:

```
The main 'geoname' table has the following fields :
---------------------------------------------------
geonameid         : integer id of record in geonames database\n
name              : name of geographical point (utf8) varchar(200)
asciiname         : name of geographical point in plain ascii characters, varchar(200)
alternatenames    : alternatenames, comma separated varchar(5000)
latitude          : latitude in decimal degrees (wgs84)
longitude         : longitude in decimal degrees (wgs84)
feature class     : see http://www.geonames.org/export/codes.html, char(1)
feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
country code      : ISO-3166 2-letter country code, 2 characters
cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 60 characters
admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80)
admin3 code       : code for third level administrative division, varchar(20)
admin4 code       : code for fourth level administrative division, varchar(20)
population        : bigint (8 byte int)
elevation         : in meters, integer
dem               : digital elevation model, srtm3 or gtopo30, average elevation of 90mx90m or 900mx900m area in meters, integer. srtm processed by cgiar/ciat
timezone          : the timezone id (see file timeZone.txt) varchar(40)
modification date : date of last modification in yyyy-MM-dd format
```
* Kopia ze strony [http://download.geonames.org/export/dump/]
* [Pełne dane po przetworzeniu na google-drive ze względu na ich wielkość (ok. 1GB)](https://drive.google.com/folderview?id=0B4yVP4J-xy3wLTRtNXA1U244Y0E&usp=sharing)
