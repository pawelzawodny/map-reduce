//Ilość kodów w powiatach

var map = function() {
    emit({powiat: this.powiat}, { count: 1 });
};

var reduce = function (key, values) {
    var count = 0;
    values.forEach(function (v) {
        count += v['count'];
    });
    return {count: count};
};

db.kody_pocztowe.mapReduce(map,reduce,{ out : 'powiaty'})


//Ilość ulic w województwach

var map = function() {
    emit(this.wojewodztwo,{ulice: [this.ulica]});
};


var reduce = function(key, val) {
    var res = {ulice:[]};
    val.forEach(function (value) {
        res.ulice = value.ulice.concat(res.ulice);
    });
    return res;
};


var finalize = function(key, res) {
	return res.ulice.length	;
};
db.kody_pocztowe.mapReduce(map,reduce,{ out : { inline : true },finalize:finalize })
