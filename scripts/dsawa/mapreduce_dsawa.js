// ----------------- Liczba kodów dla województwa

var map = function () {
  emit({kod: this.kod, wojewodztwo: this.wojewodztwo}, { count: 1 });
};

var reduce = function (key, values) {
  var count = 0;
  values.forEach(function (v) {
    count += v['count'];
  });
  return {ocb: key, count: count};
};

// Wywołanie
db.zipcodes.mapReduce(map, reduce, { out: 'kody_results'});

var map2 = function () {
  emit(this['_id']['wojewodztwo'], {count: 1});
};

// Wywołanie
db.kody_results.mapReduce(map2, reduce, { out: 'kody_for_woj_uniq'});

// ------------------ Średnia ilość kodów na miejsce w województwie

var mapFunction = function () {
  emit(this.wojewodztwo, {kody: this.kod, miejsca: this.miejsce});
};

var reduceFunction = function (key, values) {
  Array.prototype.flatten = function flatten() {
    var flat = [];
    for (var i = 0, l = this.length; i < l; i++) {
      var type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase();
      if (type) {
        flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ?
          flatten.call(this[i]) : this[i]);
      }
    }
    return flat;
  };

  Array.prototype.unique = function () {
    var uniq = {}, array = [];
    for (var i = 0, l = this.length; i < l; ++i) {
      if (uniq.hasOwnProperty(this[i])) {
        continue;
      }
      array.push(this[i]);
      uniq[this[i]] = 1;
    }
    return array;
  };

  var res = {}, kody = [], miejsca = [];

  values.forEach(function (v) {
    kody.push(v.kody);
    miejsca.push(v.miejsca);
  });

  res.kody = kody.flatten().unique();
  res.miejsca = miejsca.flatten().unique();
  return res;
};

var finalizeFunction = function (key, res) {
  res.iloscKodow = res.kody.length;
  res.iloscMiejsc = res.miejsca.length;
  res.srednia = Number((res.iloscKodow + res.iloscMiejsc) / res.iloscMiejsc).toFixed(2);

  delete res.kody;
  delete res.miejsca;
  return res;
};

// Wywołanie
db.zipcodes.mapReduce(mapFunction, reduceFunction, { finalize: finalizeFunction, out: 'results'});