var map = function() {
	emit(this.Region, 1);
};

var reduce = function(key, values) {
	var sum = 0;
	values.forEach(function(v) {
		sum += 1
	});
	return {
		count: sum
	};
};

db.earthquakes.mapReduce(map, reduce, {
	out: "earthquakes_sum"
});

db.earthquakes_sum.find({});