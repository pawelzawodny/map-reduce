var map = function() {
		emit(this.regionName, 1);
};
var reduce = function(key, val) {
		var count = 0;
		for(i=0;i<val.length; i++) {
			count += val[i];
		}
		return count;
};
db.adresyip.mapReduce(
	map,
	reduce,
	{ out : "result" }
);