### Maciej Młynarski - map reduce

```
var map = function() {
    emit(this.ISO, 1);
};

var reduce = function(key, val) {
    var count = 0;
	for(i = 0; i < val.length; i++) {
		count += val[i];
	}
	return count;
};

db.UFC_Fighters.mapReduce(
    map,
	reduce,
	{ out : "result" }
);
```
