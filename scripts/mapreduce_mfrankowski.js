var map = function() {
    emit(this.make, { make: this.make, weight: this.curb_weight, base: this.wheel_base });
};


var reduce = function(key, values) {
    var count = 0, i =0;
	var obj = {
        make: key,
        avgCW: 0,
        avgWB: 0
    };

    for(i in values) {
        obj.avgCW += values[i].weight;
        obj.avgWB += values[i].base;
        count ++;
    }
    obj.avgCW /= count;
    obj.avgWB /= count;

    return obj;
};

db.cars.mapReduce(map, reduce, { out: "results" });