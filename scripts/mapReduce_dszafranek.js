var map = function() {
	this.tekst.match(/[a-z]+/g).forEach(function(word){
			emit(word, 1);
		});
};

var reduce = function(key, val) {
	var count = 0;
	for(i = 0; i < val.length; i++) {
		count += val[i];
	}
	return count;
};

var result1 = db.textfiles.mapReduce(map, reduce, {out: 'wynik'});