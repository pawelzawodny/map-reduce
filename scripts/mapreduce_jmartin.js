var map = function() {

    var that = this;
    
    this.names.forEach(function(word) {
        emit(word, {dates: [that.date]});
    });
    
} 

var reduce = function(key, values) {

  var temp = [];
  
  for(i in values) {
      temp.push(values[i].dates[0]);
  }

  return {dates : temp};
  
} 

db.imieniny.mapReduce(map, reduce, {out: "result"}); 