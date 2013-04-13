# Books

Do kolekcji *books* zaimportowano wszystkie akapity czterech
książek:

1. Fyodor Dostoyevsky, The Idiot
2. G.K. Chesterton, The Man Who Knew Too Much
3. Leo Tolstoy, War and Peace
4. Arthur C. Doyle, The Sign of the Four

Wszystkie akapity zapisano w formacie TSV
w pliku *gutenberg-books.tsv*:

```tsv
n	title	author	p
4	The Idiot	Dostoyevsky, Fyodor	Some of the passengers by this particular train…
```

Do importu danych użyto programu *mongoimport*:

```sh
mongoimport -c books --type tsv --headerline < gutenberg-books.tsv
```

Oto przykładowy dokument z kolekcji *books*:

```json
{
  "n": 116,                          // akapit #116
  "title": "The Idiot",              // z tej książki
  "author": "Dostoyevsky, Fyodor",   // tego autora
  "p": "\"Now how on earth am I to announce a man like that?\" muttered the servant. …"
}
```

Przykładowe agregacje za pomocą MapReduce
są opisane w notatkach do wykładu
[MapReduce w przykładach](http://sinatra.local/nosql/mongodb-mapreduce).
