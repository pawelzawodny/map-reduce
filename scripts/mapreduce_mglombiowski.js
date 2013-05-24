var split = 200;
var len = 100;
var jump = split/len;


var fill = function() {

db.test.remove();


for (i = 0; i < len; i += jump) {
  
    db.test.insert({x: i, y: func(i)})

}
};

var func = function(val) {

	return Math.sin((Math.PI*val) / 100) * 50;

};

var map = function() {


	pole = 0.5 * this.y;
	
	emit("pole", pole);

	

};

var reduce = function(key, val) {
	print(val);
	return Array.sum(val);
};

fill();
db.test.mapReduce(map, reduce, {out: "pole"});
db.pole.findOne();