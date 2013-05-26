var map = function() {
	emit(this.wojewodztwo, {gminy: [this.gminy]});
};
var reduce = function(key, val) {
	var res = { gminy: [] };
	val.forEach(function(value) {
		res.gminy = value.gminy.concat(res.gminy);
	});
	return res;
};
var finalize = function(key, res) {
	var countGminy = 0, uniq = {};
	res.gminy.forEach(function(value) {
		if(!uniq[value]) {
			uniq[value] = value;
			countGminy++;
		}
	});
	res.iloscGmin = countGminy;
    delete res.gminy;
    return res;
};
db.kodypocztowe.mapReduce(
	map,
	reduce,
	{ out : "result", finalize:finalize}
);