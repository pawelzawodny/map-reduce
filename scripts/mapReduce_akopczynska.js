//Zliczanie słów
var map = function(){
    this.basilica.match(/[A-Z]?[a-z]+/g).forEach(function(z){
	emit(z , 1);
        }
   );
};
var reduce = function(key , values){
   var total = 0;
    for (var i=0; i<values.length; i++){
       total += values[i];
	}
   return total;
};
var result1 = db.bazyliki.mapReduce(map, reduce, { out :'myoutput' });

//Liczba bazylik w danym kraju

var map = function() {
	emit(this.country, 1);
}
var reduce = function(key , values){
   var total = 0;
    for (var i=0; i<values.length; i++){
       total += values[i];
	}
   return total;
};
var result2 = db.bazyliki.mapReduce(map, reduce, { out :'mycountry' });
