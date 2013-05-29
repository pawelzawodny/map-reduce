var map, reduce;

map = function() {
		emit(this.kontynent, 1);
};

reduce = function(key, val) {
		var count = 0;
		for(i = 0; i < val.length; i++) {
			count += val[i];
		}
		return count;
};

db.panstwa.mapReduce(
	map,
	reduce,
	{ out : "result" }
);
