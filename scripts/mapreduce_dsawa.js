var map = function () {
    emit({kod: this.kod, wojewodztwo: this.wojewodztwo}, { count: 1 });
};

var reduce = function (key, values) {
    var count = 0;
    values.forEach(function (v) {
        count += v['count'];
    });
    return {count: count};
};

db.zipcodes.mapReduce(map, reduce, { out: 'kody_results'});

var map2 = function () {
    emit(this['_id']['wojewodztwo'], {count: 1});
};

db.kody_results.mapReduce(map2, reduce, { out: 'kody_for_woj_uniq'});