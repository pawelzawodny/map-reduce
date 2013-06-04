var map = function () {
    emit(this.make, {
        rows: [{
				m: this.make,
                p: this.price,
                hp: this.horse_power,
                data: [],
                avgNumberOfMh: 0,
				avgPriceOfCar: 0,
            }
        ]
    });
};


var reduce = function (key, values) {
    var reduced = {
        rows: []
    }, tmpData = [],
        tmpAvgPriceOfCar = 0,
        tmpAvgPriceOfMh = 0;

    for (var i in values) {
        var val = values[i];
        for (var j in val.rows) {
            tmpData.push({
                price: val.rows[j].p,
                machineHorse: val.rows[j].hp
            });
            tmpAvgPriceOfMh += val.rows[j].hp;
            tmpAvgPriceOfCar += val.rows[j].p;
        }
    }

    reduced.rows.push({
        make: key,
        p: 0,
        hp: 0,
        data: tmpData,
        avgNumberOfMh: tmpAvgPriceOfMh,
		avgPriceOfCar: tmpAvgPriceOfCar
    });

    return reduced;
};


var fin = function (key, reduced) {

    var result = {
        make: '',
        data: [],
        avgPriceForOneMh: 0
    };

    for (var i in reduced.rows) {
        result.avgPriceForOneMh = reduced.rows[i].avgPriceOfCar / reduced.rows[i].avgNumberOfMh;
		result.data = reduced.rows[i].data;
        result.make = reduced.rows[i].make;
    }

    return result;
};

db.Cars.mapReduce(map,
    reduce, {
    out: {
        reduce: 'example'
    },
    finalize: fin
});
