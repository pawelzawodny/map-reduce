var map = function() {
	emit( this.Type, { prices: [this.Price], tos: [this.To] } );
};

var reduce = function(key, val) {
	var res = { prices:[], tos:[] };
	val.forEach(function (value) {
		res.prices = value.prices.concat(res.prices);
		res.tos = value.tos.concat(res.tos);
	} );

	return res;
};

var finalize = function(key, res) {

	var pricesCount = res.prices.length;
	var pricesSum = 0;
	var tosCount = 0;
	var unique = {};

	// Count overall prices sum.
	res.prices.forEach(function (value) {
		if(Number(value)) {
			pricesSum += value;
		}
	} );

	// Count unique clubs which transfers were made to.
	res.tos.forEach(function (value) {
		if(!unique[value]){
			unique[value] = value;
			tosCount++;	
		}
	} );

	res.tosMany = tosCount;
	res.averagePrice = Number( pricesSum / pricesCount).toFixed(2);
	
	delete res.prices;
	delete res.tos;

	return res;
};

db.transfers.mapReduce( map, reduce, { out:"result", finalize:finalize } );

