# Map Reduce

### *Andrzej Thiel*

## 1. 

Za pomocą poniższych funkcji generowane są wyniki przedstawiające kody pocztowe zaczynające się od 90-64


### Funkcja Map:
```js
m = function() {
    emit(this.kod.match(/^90-64/),1);
};
```

### Funkcja Reduce:

```js
r = function(key, values) {
    return Array.sum(values);
};
```


### Wynik :


![MapReduce 1](../images/dsawa/athiel1.png)
```json
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-640"
                        ],
                        "value" : 3
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-643"
                        ],
                        "value" : 2
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-644"
                        ],
                        "value" : 2
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-645"
                        ],
                        "value" : 2
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-646"
                        ],
                        "value" : 2
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-647"
                        ],
                        "value" : 1
                },
                {
                        "_id" : [
                                "90-64",
                                0,
                                "90-648"
                        ],
                        "value" : 1
                }

```

## 2. 

Za pomocą poniższych funkcji generowany jest wynik przedstawiający liczbe 
miast o populacji pomiędzy 5000 i 30000 oraz o nazwie stanu zaczynającego sie na literę W


### Funkcja Map:
```js
m= function() {
    emit(this.state.match(/^W[a-z]*/), this.pop);
};
```

### Funkcja Reduce:

```js
r= function(key, values) {
    var count = 0;
    for(i in values) {
        if(values[i] > 5000 && values[i] < 30000) {
            count++;
        }
    }
    return count;
};
```


### Wynik:

![MapReduce 2](../images/dsawa/athiel2.png)


```json
                {
                        "_id" : [
                                "W",
                                0,
                                "WA"
                        ],
                        "value" : 16
                },
                {
                        "_id" : [
                                "W",
                                0,
                                "WI"
                        ],
                        "value" : 6
                },
                {
                        "_id" : [
                                "W",
                                0,
                                "WV"
                        ],
                        "value" : 0
                },
                {
                        "_id" : [
                                "W",
                                0,
                                "WY"
                        ],
                        "value" : 11
                }


```
