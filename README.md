# MapReduce w przykładach

![Przykład MapReduce](/images/mapreduce-example.png)

Źródło: [MapReduceFoundation: Typing of MapReduce](http://www.infosun.fim.uni-passau.de/cl/MapReduceFoundation/)


## Nasze dane

> It’s impossible to overstress this:<br>
> 80% of the work in any data project is in cleaning the data.
>
> — DJ Patil, „Data Jujitsu”

1. Włodzimierz Bzyl, [4 Books from Project Gutenberg](/docs/wbzyl.md).
1. Paweł Kamiński, [Sacramento Crimes](/docs/pkamin.md).
1. Michał Mroczkowski, [Kody Pocztowe](/docs/mmroczkowski.md).
1. Daniel Szymczak, [Religie](/docs/dszymczak.md).
1. Łukasz Wasak, [Ceny Towarów w Polsce](/docs/lwasak.md).
1. Ryszard Madejski, [Samochody w USA](/docs/xjedam.md).
1. Aneta Budner, [Adresy IP](/docs/abudner.md).
1. Urszula Sawicka, [Popularne nazwy produktów](/docs/usawicka.md).
1. Jan Mudry, [Obliczenie liczby pi metodą Monte Carlo](/docs/jmudry.md).
1. Jakub Martin, [Imieniny](/docs/jmartin.md).
1. Alicja Kopczyńska, [Bazyliki](/docs/akopczynska.md).
1. Dorian Sawa, [Kody pocztowe](/docs/dsawa.md).
1. Jan Pawlukiewicz, [Samochody w USA](/docs/joshuaBE.md).
1. Paweł Śląski, [Aktywność userów Githuba](/docs/pslaski.md).
1. Marcin Głombiowski, [Całkowanie metodą prostokątów](/docs/mglombiowski.md).
1. Daniel Landowski, [Duże i małe książki](/docs/dlandows.md).
1. Jakub Ciechowski, [Trzęsienia ziemi](/docs/jciechowski.md).
1. Adam Radomski, [Kody pocztowe](/docs/aradomski.md).
1. Marcin Gigołło, [Samochody](/docs/6i6ant.md).
1. Wojciech Szymański, [Samochody w USA](/docs/wszymanski.md).
1. Damian Szafranek, [Lista UNESCO i czołgi WW2](/docs/dszafranek.md).
1. Patryk Jażdżewski, [Wydatki Home Office](/docs/pjazdzewski.md).
1. Romuald Łuczyk, [Państwa świata](/docs/rluczyk.md).
1. Adrian Szulc, [Lotniska](/docs/aszulc.md).
1. Michał Frankowski, [Samochody](/docs/mfrankowski.md).
1. Łukasz Kępiński, [Transfery piłkarzy 2007-2013](/docs/lkepinsk.md).
1. Andrzej Thiel, [Kody pocztowe](/docs/athiel.md).
1. Damian Wieliczko, [Kody_pocztowe](/docs/wielik17.md).
1. Maciej Stanik, [Samochody w USA](/docs/180.md).
1. Przemysław Jakuła, [GeoNames - kraje, miejscowości świata](/docs/pjakula.md).
1. Mateusz Skorb, [Monety okolicznościowe](/docs/mskorb.md).
1. Maciej Młynarski, [UFC Fighters](/docs/mmlynarski.md).
1. Marek Dubrawa, [Rynek samachodowy w USA 2000r](/docs/mdubrawa.md).
1. Bartłomiej Bedra, [Lotniska](/docs/bbedra.md).
1. Adam Szuliński, [Religie](/docs/aszulinski.md).
1. Anna Łońska, [Lotniska](/docs/alonska.md).
1. Pawel Zawodny, [Tour de France] (/docs/pzawodny.md).


## GitHub Archive

* [GitHub Archive](http://www.githubarchive.org/)
* Ilya Grigorik,
  [Analyzing Millions of GitHub Commits](http://www.igvita.com/slides/2012/bigquery-github-strata.pdf)


Przykładowy JSON:

```json
{
  "repository": {
    "master_branch": "master",
    "pushed_at": "2013-03-31T06:14:38-07:00",
    "created_at": "2011-01-12T03:10:05-08:00",
    "language": "JavaScript",
    "forks": 4,
    "stargazers": 8,
    "watchers": 8,
    "homepage": "",
    "description": "",
    "url": "https://github.com/wbzyl/nosql-tutorial",
    "name": "nosql-tutorial",
    "id": 1245063,
    "fork": false,
    "size": 564,
    "owner": "wbzyl",
    "private": false,
    "open_issues": 0,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true
  },
  "actor_attributes": {
    "email": "matwb@univ.gda.pl",
    "location": "Poland",
    "blog": "http://tao.inf.ug.edu.pl/",
    "company": "Institute of  Informatics, The University of Gdańsk",
    "name": "Wlodek Bzyl",
    "gravatar_id": "5daf79134c95a64ccdbf2bd477e52392",
    "type": "User",
    "login": "wbzyl"
  },
  "actor": "wbzyl",
  "url": "https://github.com/wbzyl/nosql-tutorial/compare/073c0ed4c5...e5a8ae8209",
  "type": "PushEvent",
  "public": true,
  "payload": {
    "head": "e5a8ae820950953ce115801fe099d42ecb481ed1",
    "ref": "refs/heads/master",
    "size": 1,
    "shas": [
      ["e5a8ae820950953ce115801fe099d42ecb481ed1","matwb@univ.gda.pl","update README-Ruby.md","Wlodek Bzyl",true]
    ]
  },
  "created_at": "2013-03-31T06:14:39-07:00"
}
```
