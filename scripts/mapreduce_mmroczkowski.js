var map = function() {
	emit(this.wojewodztwo,{kody: [this.kod], miasta: [this.miejscowosci_str]});
};
var reduce = function(key, val) {
	var res = {kody:[], miasta:[]};
	val.forEach(function (value) {
		res.kody = value.kody.concat(res.kody);
		res.miasta = value.miasta.concat(res.miasta);
	});
	return res;
};
var finalize = function(key, res) {
	var countKody = res.kody.length, countMiasta = 0, uniq = {};
	res.miasta.forEach(function (value) {
		if(!uniq[value]) {
			uniq[value] = value;
			countMiasta++;
		}
	});
	res.iloscMiast = countMiasta;
	res.iloscKodowPocztowych = countKody;
	res.srednia = Number(countKody / countMiasta).toFixed(2);
    delete res.miasta;
    delete res.kody;
    return res;
};
db.kody3.mapReduce(
	map,
	reduce,
	{ out : "result", finalize:finalize}
);