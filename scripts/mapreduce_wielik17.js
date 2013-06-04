//Ilość kodów pocztowych w poszczególnych województwach.

var map = function() {
        emit(this.wojewodztwo, 1);
};

reduce = function(key, values) {
    return Array.sum(values);
};

db.kody_pocztowe.mapReduce(map,reduce,{ out :{ inline : true }})

//Miejscowości zaczynające się na "Duż".

map = function() {
    emit( { miejsce: this.miejsce.match(/^Duż/) } ,1);
};

reduce = function(key, values) {
    return Array.sum(values);
};

db.kody_pocztowe.mapReduce(map,reduce,{ out :{ inline : true }})
