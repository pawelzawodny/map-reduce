var map = function() {
    emit(this.Rok, this.Nakład);
};

var reduce = function(key, values) {
var count = 0;
    for(i in values) {
        if(values[i] >= 300000) {
            count++;
        }
    }
    return count;
}

db.coins.mapReduce(m, r, {out: "naklad"});
