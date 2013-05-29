//--------MAP REDUCE 1------------

var map = function() {
        emit(this.iso_country, 1);
};

var reduce = function(key, val) {
        var count = 0;
        for(i=0; i<val.length; i++) {
            count += val[i];
        }
        return count;
};

var res1 = db.airports1.mapReduce(map, reduce, {out: 'result1'});


//--------MAP REDUCE 2------------

var map = function() {
        emit(this.type, 1);
};

var reduce = function(key, val) {
        var count = 0;
        for(i=0; i<val.length; i++) {
            count += val[i];
        }
        return count;
};

var res2 = db.airports1.mapReduce(map, reduce, {out: 'result2'});

