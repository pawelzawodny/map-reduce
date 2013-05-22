var map = function () {
	emit({codder : this.actor}, { count: 1 });
};

var reduce = function (key, values) {
    var count = 0;
    values.forEach(function (v) {
        count += v['count'];
    });
    return {count: count};
};

db.github_sunday_evening.mapReduce(map, reduce, { out: 'codder_results'});  // sort : {"value.count" : -1, limit : 10}

// how to get this['repository.language'] value ???
/* var map2 = function () {
	var l;
	if(typeof this['repository.language'] !== 'undefined') {
		l = this['repository.language'];
	} else l = 'unknown';
	emit({lang: this['repository.language']}, { count: 1 });
};

db.github_sunday_evening.mapReduce(map2, reduce, { out: 'lang_results'}); */



var map2 = function () {
   emit(this['_id']['codder'], {count: 1});
};
