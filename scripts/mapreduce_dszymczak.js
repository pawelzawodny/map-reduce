var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});

new mongodb.Db('test', server, {w: 1}).open(function (error, client) {
	if (error) throw error;

var col1 = new mongodb.Collection(client, 'census1881');
var col2 = new mongodb.Collection(client, 'airports');

//--------RELIGIE------------
var mapFunction1 = function() {
	emit(this.religion, this.age);
	}

var reduceFunction2 = function(key, values) {
	var count = 0;
	for(i in values) {
		if(values[i] > 18 && values[i] < 60) {
			count++;
		}
	}
	return count;
}

var result1 = db.census1881.mapReduce(mapFunction, reduceFunction, {out: {inline: 1}});


//--------LOTNISKA------------
var mapFunction2 = function() {
    emit(this.type,1);
}

var reduceFunction2 = function(key, values) {
    return Array.sum(values);
}

var result2 = db.airports.mapReduce(mapFunction, reduceFunction, {out: {inline: 1}});
});

