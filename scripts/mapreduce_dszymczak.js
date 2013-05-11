var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});

new mongodb.Db('test', server, {w: 1}).open(function (error, client) {
	if (error) throw error;

var col = new mongodb.Collection(client, 'census1881');

var mapFunction = function() {
	emit(this.religion, this.age);
	}

var reduceFunction = function(key, values) {
	var count = 0;
	for(i in values) {
		if(values[i] > 18 && values[i] < 60) {
			count++;
		}
	}
	return count;
}

var result = db.census1881.mapReduce(mapFunction, reduceFunction, {out: {inline: 1}});
});

