var m = function() {
    emit(
        this.make,
        {make: this.make, avgHP: this.horse_power, avgMPG: this.mpg_city + this.mpg_highway}
    );
};
var r = function(key, vals) {
    var obj = {
        make: key,
        avgHP: 0,
        avgMPG: 0
    };
    var count = 0;

    for(var j in vals) {
        var v = vals[j];
        obj.avgHP += v.avgHP;
        obj.avgMPG += v.avgMPG;
        count += 1;
    }
    obj.avgHP /= count;
    obj.avgMPG /= (count*2);

    return obj;
};

db.cars.mapReduce(m, r, {out: "makes_avg_HP"});
