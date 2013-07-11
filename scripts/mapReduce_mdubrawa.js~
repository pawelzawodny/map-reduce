var map = function () {
    emit(this.region, {
        rows: [{
                reg: this.region,
                c: this.cena,
                r: this.rok,
                data: [],
                avgPrice: 0,
                count: 1
            }
        ]
    });
};

var reduce = function (key, values) {
    var reduced = {
        rows: []
    }, tmpData = [],
        tmpCount = 0,
        tmpAvgPrice = 0;

    for (var i in values) {
        var val = values[i];
        for (var j in val.rows) {
            tmpData.push({
                cena: val.rows[j].c,
                rok: val.rows[j].r
            });
            tmpAvgPrice += val.rows[j].c;
            tmpCount += val.rows[j].count;
        }
    }

    reduced.rows.push({
        reg: key,
        c: 0,
        r: 0,
        data: tmpData,
        avgPrice: tmpAvgPrice,
        count: tmpCount
    });

    return reduced;
};

var fin = function (key, reduced) {

    var result = {
        region: '',
        dane: [],
        sredniaCena: 0
    };

    for (var i in reduced.rows) {
        if (reduced.rows[i].count > 0) {
            result.sredniaCena = reduced.rows[i].avgPrice / reduced.rows[i].count;
        }

        result.dane = reduced.rows[i].data;
        result.region = reduced.rows[i].reg;
    }

    return result;
};

db.Prices.mapReduce(map,
    reduce, {
    query: {
        towar: 'ryż'
    },
    out: {
        reduce: 'example'
    },
    finalize: fin
});