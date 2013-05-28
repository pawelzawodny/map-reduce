// Ilość modeli danej marki z mocą silnika z przedziału 120-200 koni mechanicznych.
var m = function() {
    emit(this.make, this.horse_power);
};


var r = function(key, values) {
var count = 0;
    for(i in values) {
        if(values[i] > 120 && values[i] < 200) {
            count++;
        }
    }
    return count;
}

var result1 = db.samochody.mapReduce(m, r, {out: "power"});



// Ilość modeli danej marki z manualną skrzynią biegów
var m = function() {
    emit(this.make, this.transmission);
};

var r = function(key, values) {
    var count = 0;
    for(i in values) {
        if(values[i] == "manual") {
            count++;
        }
    }
    return count;
}

var result2 = db.samochody.mapReduce(m, r, {out: "transmission"})
