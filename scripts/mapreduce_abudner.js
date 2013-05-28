//Dla każdego województwa wyliczam liczbę klas adresów IP.
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
//Dla każdego województwa wyliczam liczbę zakresów IP oraz liczbę miast , które posiadaja dany zakres IP.
var map = function() {
		emit(this.regionName, {miasto: [this.cityName]});
};
var reduce = function(key, value) {
		var ret = { miasto: [] };
		value.forEach(function(value) {
			ret.miasto = value.miasto.concat(ret.miasto);
		});
		return ret;
};
var finalize = function(key, ret) {
		var liczbaIP = 0, liczbaMiast = 0, unikalneMiasta = {};
		ret.miasto.forEach(function(value) {
			liczbaIP++;
			if(!unikalneMiasta[value]) {
				unikalneMiasta[value] = value;
			liczbaMiast++;
			}
		});
		ret.liczbaMiast = liczbaMiast;
		ret.liczbaIP = liczbaIP;
		delete ret.miasto;
		return ret;
};
db.adresyip.mapReduce(
		map,
		reduce,
		{
			out : "result",
			finalize:finalize
		}
);